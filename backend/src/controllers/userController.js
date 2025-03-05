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

// Check if username is unique
export const uniqueUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        const isUnique = !user;
        if (isUnique) {
            sendResponse(res, 200, 'Username is unique.', {username, isUnique});
        } else {
            sendResponse(res, 200, 'Username is already taken.', {username, isUnique});
        }
    } catch (error) {
        next(error)
    }
};

// Create a new user
export const create = async (req, res, next) => {
    try {
        const { uuid, username, email, avatar } = req.body;
        const newUser = new User({ uuid, username, email, avatar });
        await newUser.save();
        sendResponse(res, 201, 'User has been created successfully.', newUser);
    } catch (error) {
        next(error);
    }
};

// Get all users
export const index = async (req, res, next) => {
    const { username } = req.query;
    let query = {};

    if (username) {
        query = { username: username };
    }

    try {
        const users = await User.find(query);
        if (username) {
            const isUnique = users.length === 0;
            return sendResponse(res, 200, { isUnique });
        } else {
            sendResponse(res, 200, 'Users fetched successfully.', users);
        }
    } catch (error) {
        next(error);
    }
};

// Get a user by UUID
export const show = async (req, res, next) => {
    try {
        const user = await User.findOne({ uuid: req.params.id });
        if (!user) {
            return sendResponse(res, 404, 'User not found.', null);
        }
        sendResponse(res, 200, 'User fetched successfully.', user);
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
        sendResponse(res, 200, 'User has been synced.', user);
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
            return sendResponse(res, 404, 'User not found.', null);
        }
        sendResponse(res, 200, 'User has been updated.', user);
    } catch (error) {
        next(error);
    }
};

// Delete a user by UUID
export const destroy = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ uuid: req.params.id });
        if (!user) {
            return sendResponse(res, 404, 'User not found.', null);
        }
        sendResponse(res, 200, 'User has been deleted.', null);
    } catch (error) {
        next(error);
    }
};
