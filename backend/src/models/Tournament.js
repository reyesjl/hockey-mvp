// backend/models/Tournament.js

const mongoose = require('mongoose');
const { VALID_AGE_GROUPS, VALID_LEVELS_OF_PLAY } = require('./values/tournamentConstants');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    location: { 
        type: String,
        required: true,
        index: true,
    },
    dates: {
        type: [Date],
        required: true,
        validate: {
            validator: function (dates) {
                return dates.every(date => date > Date.now());
            },
            message: 'Dates must be in the future.'
        }
    },
    contactEmail: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Contact email must be a valid email address.'
        }
    },
    notes: { type: String },
    company: { type: String },
    overallRatingSum: { type: Number, default: 0 },
    overallRatingCount: { type: Number, default: 0 },
    communicationRatingSum: { type: Number, default: 0 },
    communicationRatingCount: { type: Number, default: 0 },
    refereeRatingSum: { type: Number, default: 0 },
    refereeRatingCount: { type: Number, default: 0 },
    gamesMinimum: { type: Number, default: 1, min: 1 },
    levelOfPlay: {
        type: [String],
        required: true,
        validate: {
            validator: function (levels) {
                return levels.every(level => VALID_LEVELS_OF_PLAY.includes(level));
            },
            message: 'Invalid level of play.'
        }
    },
    ageGroups: { 
        type: [String], 
        required: true,
        validate: {
            validator: function (ages) {
                return ages.every(age => VALID_AGE_GROUPS.includes(age));
            },
            message: 'Invalid age group.'
        }
    },
    usaHockeySanctioned: { type: Boolean },
    firstPlaceHardware: { type: [String] }, // Example: ['Team Banner', 'Players Medals']
    secondPlaceHardware: { type: [String] }, // Example: ['Team Banner']
    stayAndPlay: { type: Boolean },
    extendedCheckout: { type: Boolean },
    multiTeamDiscounts: { type: Boolean },
    earlyBirdDiscounts: { type: String }, // Description of early bird discounts
    otherDiscounts: { type: String } // Description of other discounts
}, {
    timestamps: true
});

// Index name and location for searching efficiency
tournamentSchema.index({ name: 'text', location: 'text' });

// Virtual computed average rating
tournamentSchema.virtual('computedOverallRating').get(function() {
    return this.overallRatingCount > 0 ? this.overallRatingSum / this.overallRatingCount : 0;
});

// Virtual computed communication rating
tournamentSchema.virtual('computedCommunicationRating').get(function() {
    return this.communicationRatingCount > 0 ? this.communicationRatingSum / this.communicationRatingCount : 0;
});

// VIrtual computed referee rating
tournamentSchema.virtual('computedRefereeRating').get(function() {
    return this.refereeRatingCount > 0 ? this.refereeRatingSum / this.refereeRatingCount : 0;
});

module.exports = mongoose.model('Tournament', tournamentSchema, 'tournaments');