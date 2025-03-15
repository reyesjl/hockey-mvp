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
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
}

// Login user
export const login = async (req, res, next) => {
    const { firebaseToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const userUid = decodedToken.uid;

        const user = await User.findOne({ uuid: userUid });
        if (!user) {
            sendResponse(res, 404, 'User not found.', null);
        }

        // Create payload   
        const payload = {
            _id: user._id,
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            roles: user.roles,
            permissions: user.permissions,
            isActive: user.isActive
        };

        // Generate JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        sendResponse(res, 200, 'User logged in.', { user: user, token: token });
    } catch (error) {
        console.error('Error verifying token:', error);
        sendResponse(res, 401, 'Unauthorized access.', null);
    }
};

export const refreshToken = async (req, res, next) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ uuid: decoded.uuid });

        if (!user) {
            sendResponse(res, 404, 'User not found.', null);
        }

        // Create payload   
        const payload = {
            _id: user._id,
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            roles: user.roles,
            permissions: user.permissions,
            isActive: user.isActive
        };

        // Generate JWT
        const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        sendResponse(res, 200, 'Token refreshed.', { user: user, token: newToken });
    } catch (error) {
        console.error('Error verifying token:', error);
        sendResponse(res, 401, 'Unauthorized access.', null);
    }
}