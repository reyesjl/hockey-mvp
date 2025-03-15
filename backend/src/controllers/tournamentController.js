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

import Tournament from '../models/Tournament.js';
import { sendResponse } from '../utils/responses/responseHandler.js';
import { ValidationError, NotFoundError, InternalServerError } from '../middlewares/errors/AppError.js';

// Create a new tournament
export async function create(req, res, next) {
    const { name, location, dates, company, level_of_play, age_groups, gender, submitted_by } = req.body;

    // Basic check for required fields
    if (!name || !location || !dates || !company || !level_of_play || !age_groups || !gender || !submitted_by) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        return sendResponse(res, 201, 'Tournament created successfully', tournament);
    } catch (error) {
        return next(error);
    }
}

// Get all tournaments
export async function index(req, res, next) {
    const { search, city, company_name, start_date, end_date, submitted_by, visible, page = 1, limit = 12 } = req.query;
    let query = {};

    // Filter by visibility
    if (visible) {
        query['visible.state'] = visible;
    }

    // Use text search if a search term is provided
    if (search) {
        query = {
            $or: [
                { $text: { $search: search } },  // Text search for exact matches
                { name: { $regex: search, $options: 'i' } },  // Regex for partial matches
                { 'location.city': { $regex: search, $options: 'i' } }  // Regex for partial matches
            ]
        };
    }

    // Filter by city
    if (city) {
        query['location.city'] = city;
    }

    // Filter by company name
    if (company_name) {
        query['company.name'] = company_name;
    }

    // Filter by date range
    if (start_date && end_date) {
        query.dates = {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
        };
    }

    // Filter by submitted by
    if (submitted_by) {
        query.submitted_by = submitted_by;
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        skip: (parseInt(page, 10) - 1) * parseInt(limit, 10)
    };

    try {
        
        const tournaments = await Tournament.find(query)
            .skip(options.skip)
            .limit(options.limit);
        const totalTournaments = tournaments.length;
        return sendResponse(res, 200, 'Tournaments fetched successfully', { tournaments, totalTournaments});
    } catch (error) {
        return next(error);
    }
}

// Get a tournament by ID
export async function show(req, res, next) {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return sendResponse(res, 200, 'Tournament fetched successfully', tournament);
    } catch (error) {
        return next(error);
    }
}

// Update a tournament by ID
export async function update(req, res, next) {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return sendResponse(res, 200, 'Tournament updated successfully', tournament);
    } catch (error) {
        return next(error);
    }
}

// Delete a tournament by ID
export async function destroy(req, res, next) {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndDelete(id);
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return next(error);
    }
}