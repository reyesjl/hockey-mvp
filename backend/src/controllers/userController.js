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

import User from '../models/User.js';
import { sendResponse } from '../utils/responses/responseHandler.js';

// Create a new user
export const create = async (req, res, next) => {
    try {
        const { uuid, username, avatar } = req.body;
        const newUser = new User({ uuid, username, avatar });
        await newUser.save();
        sendResponse(res, 201, newUser);
    } catch (error) {
        next(error);
    }
};

// Get all users
export const index = async (req, res, next) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, users);
    } catch (error) {
        next(error);
    }
};

// Get a user by UUID
export const show = async (req, res, next) => {
    try {
        const user = await User.findOne({ uuid: req.params.id });
        if (!user) {
            return sendResponse(res, 404, { message: 'User not found' });
        }
        sendResponse(res, 200, user);
    } catch (error) {
        next(error);
    }
};

// Sync mongoDB user data with firebase user data
export const syncUser = async (req, res, next) => {
    try {
        const { uuid, username, email, avatar } = req.body;
        const user = await User.findOneAndUpdate(
            { uuid },
            { username, email, avatar },
            { new: true, upsert: true, runValidators: true }
        );
        sendResponse(res, 200, user);
    } catch (error) {
        next(error);
    }
};

// Update a user by UUID
export const update = async (req, res, next) => {
    try {
        const { username, avatar } = req.body;
        const user = await User.findOneAndUpdate(
            { uuid: req.params.id },
            { username, avatar },
            { new: true, runValidators: true }
        );
        if (!user) {
            return sendResponse(res, 404, { message: 'User not found' });
        }
        sendResponse(res, 200, user);
    } catch (error) {
        next(error);
    }
};

// Delete a user by UUID
export const destroy = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ uuid: req.params.id });
        if (!user) {
            return sendResponse(res, 404, { message: 'User not found' });
        }
        sendResponse(res, 200, { message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
