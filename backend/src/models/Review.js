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
import Tournament from './Tournament.js';

// Review model
const reviewSchema = new Schema({
    tournament: { 
        type: Schema.Types.ObjectId, 
        ref: 'Tournament', 
        required: true 
    },
    reviewer: { 
        id: { 
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        username: {
            type: String,
            required: true
        }
    },
    ratings: {
        overall: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        referee: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        },
        communication: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        },
        facilities: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        }
    },
    subject: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    comment: { 
        type: String, 
        required: true,
        minlength: 50,
        maxlength: 1000
    },
    status: {
        type: String,
        enum: ['visible', 'hidden', 'flagged'],
        default: 'visible'
    },
}, {
    timestamps: true
});

// Unique compound index to ensure one review per user per tournament
reviewSchema.index({ tournament: 1, reviewer: 1 }, { unique: true });

// Post-save hook to update tournament rating
reviewSchema.post('save', async function() {
    const tournament = await Tournament.findById(this.tournament);
    if (tournament) {
        await tournament.calculateRating();
    }
});

export default model('Review', reviewSchema, 'reviews');