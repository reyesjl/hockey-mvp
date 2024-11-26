// backend/models/Flag.js

const mongoose = require('mongoose');
const { VALID_FIELDS } = require('./values/flagConstants');

// Flag model
const flagSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
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
    fields: [
        {
            type: String,
            enum: VALID_FIELDS,
            required: true,
        },
    ],
    reason: {
        type: String,
        required: true,
        maxlength: 500,
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

flagSchema.index({ tournament: 1, submittedBy: 1, fields: 1 }, { unique: true });

module.exports = mongoose.model('Flag', flagSchema, 'flags');
