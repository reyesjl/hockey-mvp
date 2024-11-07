// backend/models/Tournament.js

const mongoose = require('mongoose');
const { VALID_AGE_GROUPS, VALID_LEVELS_OF_PLAY } = require('./values/tournamentConstants');

// Tournament model
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
    notes: { type: String, default: '' },
    company: { type: String, required: true },
    overallRating: { type: Number, default: 0.0, min: 0, max: 5 },
    refereeRating: { type: Number, default: 0.0, min: 0, max: 5 },
    tournamentCommunicationRating: { type: Number, default: 0.0, min: 0, max: 5 },
    gamesMinimum: { type: Number, required: true, min: 1 },
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
    usaHockeySanctioned: { type: Boolean, default: false },
    firstPlaceHardware: { type: [String], default: [] }, // Example: ['Team Banner', 'Players Medals']
    secondPlaceHardware: { type: [String], default: [] }, // Example: ['Team Banner']
    stayAndPlay: { type: Boolean, default: false },
    extendedCheckout: { type: Boolean, default: false },
    multiTeamDiscounts: { type: Boolean, default: false },
    earlyBirdDiscounts: { type: String, default: '' }, // Description of early bird discounts
    otherDiscounts: { type: String, default: '' } // Description of other discounts
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Indexes
tournamentSchema.index({ name: 'text', location: 'text' });

// Export the model
module.exports = mongoose.model('Tournament', tournamentSchema, 'tournaments');