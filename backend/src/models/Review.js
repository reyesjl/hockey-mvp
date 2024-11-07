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
    submittedBy: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Submitted by must be a valid email address.'
        }
    },
    attendedDate: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: true
    },
    parkingNotes: {
        type: String,
        default: ''
    },
    overallRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    refereeRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    communicationRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Review', reviewSchema, 'reviews');