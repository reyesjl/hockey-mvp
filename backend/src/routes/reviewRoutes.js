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

import express from 'express';
import { create, index, show, update, destroy } from '../controllers/reviewsController.js';

const router = express.Router();

router.get('/tournament/:tournamentId', index);
router.post('/', create);
router.get('/:id', show);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;
