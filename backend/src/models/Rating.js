// src/models/Rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
        index: true
    },
    userUid: {
        type: String,
        required: true,
        index: true
    },
    // Optional rating fields (1-5), user might only fill some of these
    overall: {
        type: Number,
        min: 1.0,
        max: 5.0
    },
    communication: {
        type: Number,
        min: 1.0,
        max: 5.0
    },
    referee: {
        type: Number,
        min: 1.0,
        max: 5.0
    },
    // To track how many times a user updated their rating
    updateCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Ensure one rating document per user per tournament
ratingSchema.index({ tournamentId: 1, userUid: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema, 'ratings');