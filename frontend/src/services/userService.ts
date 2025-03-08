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

import { axiosInstance } from '@/config/apiConfig';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { useAuthStore } from '@/stores/authStore';

// Update the user's avatar in the database and sync with Firebase
export const resetUserAvatar = async (userId: string, defaultAvatarPath: string) => {
    try {
        // Update the user's avatar in the database
        const response = await axiosInstance.patch(`/users/${userId}`, { avatar: defaultAvatarPath });
        const { success, message, data } = response.data;
        console.log('Reset user avatar response:', response.data);
        
        if (!success) {
            throw new Error(message);
        }

        // Sync the updated avatar with Firebase
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
            await updateProfile(firebaseUser, { photoURL: defaultAvatarPath });
        }

        // Update the user in the store
        const authStore = useAuthStore();
        authStore.setUser(data);

        // Update the user in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        console.log('User avatar reset successfully:', data);

        return data;
    } catch (error) {
        console.error('Error resetting user avatar:', error);
        throw new Error('Error resetting user avatar.');
    }
};

// Handle saving the user's new avatar
export const saveUserAvatar = async (userId: string, newAvatarPath: string) => {
    try {
        // Update the user's avatar in the database
        const response = await axiosInstance.patch(`/users/${userId}`, { avatar: newAvatarPath });
        const { success, message, data } = response.data;
        console.log('Save user avatar response:', response.data);

        if (!success) {
            throw new Error(message);
        }

        // Sync the updated avatar with Firebase
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
            await updateProfile(firebaseUser, { photoURL: newAvatarPath });
        }

        // Update the user in the store
        const authStore = useAuthStore();
        authStore.setUser(data);

        // Update the user in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        console.log('User avatar saved successfully:', data);

        return data;
    } catch (error) {
        console.error('Error saving user avatar:', error);
        throw new Error('Error saving user avatar.');
    }
};