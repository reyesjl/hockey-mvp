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

const userSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: 'Email must be a valid address.',
        },
    },
    avatar: {
        type: String,
    },
    roles: {
        type: [String],
        default: ['user'],
        enum: ['user', 'admin', 'moderator'],
    },
    permissions: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

export default model('User', userSchema, 'users');
