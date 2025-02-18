/**
 * Youth Hockey Tournaments
 * 
 * Author: Jose Reyes
 * Date: Dec 27, 2025
 * 
 * Copyright © 2025 Jose Reyes. All rights reserved.
 * 
 * This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
 * in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.
 * 
 * This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
 * Any unauthorized use may result in legal action.
 * 
 * For inquiries regarding licensing or permissions, please contact Jose Reyes.
 */

import { Schema, model } from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;
import Review from './Review.js';

const VALID_AGE_GROUPS = ['8U', '10U', '12U', '14U', '16U', '18U', 'Midget', 'Junior', 'Varsity', 'Adult/Rec'];
const VALID_LEVELS_OF_PLAY = ['AAA', 'AA', 'A', 'B', 'C/Rec/House'];

const tournamentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        geo: {
            type: { type: String, enum: ['Point']},
            coordinates: { type: [Number] },
        },
    },
    company: {
        name: { type: String },
        email: {
            type: String,
            validate: {
                validator: isEmail,
                message: 'Company email must be a valid email address.',
            },
        },
    },
    submitted_by: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        default: null,
    },
    description: { type: String },
    dates: {
        type: [Date],
        required: true,
        validate: {
            validator: function (dates) {
                return dates.every(date => date > Date.now());
            },
            message: 'Dates must be in the future.',
        },
    },
    minimum_games: { type: Number, default: 1, min: 1 },
    level_of_play: {
        type: [String],
        required: true,
        enum: VALID_LEVELS_OF_PLAY,
        message: 'Invalid level of play.',
    },
    age_groups: { 
        type: [String], 
        required: true,
        enum: VALID_AGE_GROUPS,
        message: 'Invalid age group.',
    },
    details: {
        usa_sanctioned: { type: Boolean, default: true },
        stay_and_play: { type: Boolean, default: false },
        extended_checkout: { type: Boolean, default: false },
    },
    gender: {
        type: String,
        enum: ['boys', 'girls', 'both'],
        required: true,
        message: 'Invalid gender.',
    },
    hardware: {
        first_place: { type: String },
        second_place: { type: String },
    },
    discounts: {
        multi_team: { type: Boolean, default: false },
        early_bird: { type: String },
        other: { type: String },
    },
    rating: {
        score: { type: Number, default: 0 },
        votes: { type: Number, default: 0 },
    },
    visible: {
        state: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        reason: {
            type: String,
            default: ''
        }
    },
}, {
    timestamps: true,
});

// Virtual for full address
tournamentSchema.virtual('full_address').get(function() {
    return `${this.location.city}, ${this.location.state}`;
});

// Instance method to get formatted dates
tournamentSchema.methods.getFormattedDates = function() {
    return this.dates.map(date => date.toDateString());
};

// Static method to find tournaments by city
tournamentSchema.statics.findByCity = function(city) {
    return this.find({ 'location.city': city });
};

// Static method to find tournaments by company name
tournamentSchema.statics.findByCompany = function(companyName) {
    return this.find({ 'company.name': companyName });
};

// Static method to find tournaments by name
tournamentSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
};

// Static method to find tournaments by date range
tournamentSchema.statics.findByDateRange = function(startDate, endDate) {
    return this.find({
        dates: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    });
};

// Method to calculate aggregate rating
tournamentSchema.methods.calculateRating = async function() {
    const reviews = await Review.find({ tournament: this._id });
    if (reviews.length === 0) {
        this.rating.score = 0;
        this.rating.votes = 0;
    } else {
        const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating.score = totalScore / reviews.length;
        this.rating.votes = reviews.length;
    }
    await this.save();
};

// Indexes for frequently queried fields
tournamentSchema.index({ 'company.name': 1 });
tournamentSchema.index({ 'location.city': 1 });
tournamentSchema.index({ 'location.state': 1 });
tournamentSchema.index({ 'dates': 1 });

export default model('Tournament', tournamentSchema, 'tournaments');
