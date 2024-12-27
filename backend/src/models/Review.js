// backend/models/Review.js

const mongoose = require('mongoose');

// Review model
const reviewSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
        index: true
    },
    userUid: {
        type: String,
        required: true
    },
    attendedDate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    parkingNotes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Ensure one review document per user per tournament
reviewSchema.index({ tournamentId: 1, userUid: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema, 'reviews');