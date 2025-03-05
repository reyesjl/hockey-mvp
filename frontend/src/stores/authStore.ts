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

import { defineStore } from 'pinia';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    }
});