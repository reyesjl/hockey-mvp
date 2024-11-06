// backend/models/TournamentSubmission.js

const mongoose = require('mongoose');
const { VALID_AGE_GROUPS, VALID_LEVELS_OF_PLAY } = require('./values/tournamentConstants');

// TournamentSubmission model
const tournamentSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    location: { type: String, required: true },
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
    company: { type: String, default: '' }, // Optional
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
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    submittedBy: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Submitted by must be a valid email address.'
        }
    }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('TournamentSubmission', tournamentSubmissionSchema, 'tournament_submissions');