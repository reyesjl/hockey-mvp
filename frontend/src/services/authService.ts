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

import { auth } from "@/firebase";
import { axiosInstance } from "@/config/apiConfig";
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, sendEmailVerification, updateProfile
} from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";
import { CustomError } from "@/utils/CustomError";

export const signup = async (email: string, password: string, username: string) => {
    try {
        // Check if username exists first
        const isUnique = await checkUsername(username);
        if (!isUnique) {
            throw new CustomError('Username is taken.', 'auth/username-taken');
        }

        // Create new user in firebase
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredentials.user;

        // Send email verification
        await sendEmailVerification(firebaseUser);

        const localUser = await createUserRef(firebaseUser.uid, email, username);

        //await syncUserData(firebaseUser, localUser);

        // Log user out after signup
        await logout();
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError('Error signing up.', 'signup-error');
        }
    }
}

export const login = async (email: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredentials.user;

        // Check if email is verified
        if (!firebaseUser.emailVerified) {
            throw new CustomError('Email not verified. Please check your inbox.', 'auth/email-not-verified');
        }

        // Fetch user from database
        const localUser = await fetchUserFromDatabase(firebaseUser.uid);

        await syncUserData(firebaseUser, localUser);

        // Store user data locally
        const authStore = useAuthStore();
        authStore.setUser(localUser);
        localStorage.setItem('user', JSON.stringify(localUser));

        return { success: true, message: "User logged in!", firebaseUser, localUser };
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            throw new CustomError('No user found with this email.', 'user-not-found');
        } else if (error.code === 'auth/wrong-password') {
            throw new CustomError('Incorrect password.', 'wrong-password');
        } else if (error.code === 'auth/invalid-credential') {
            throw new CustomError('Invalid credentials, please try again.', 'invalid-credentials');
        } else if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError('An unexpected error occurred.', 'unexpected-error');
        }
    }
}

export const logout = async () => {
    try {
        await signOut(auth);

        // Clear local user data
        const authStore = useAuthStore();
        authStore.clearUser();
        localStorage.removeItem('user');
    }
    catch (error) {
        throw new CustomError('Error logging out.', 'logout-error');
    }
}

// Handle checking if a username is unique
const checkUsername = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/users/check-username/${username}`);
        const { success, message, data } = response.data;
        return data.isUnique;
    } catch (error) {
        throw new CustomError('Error checking username uniqueness.', 'username-check-error');
    }
};

// Handle creating a user in our database
// references the firebase user uuid
const createUserRef = async (uuid: string, email: string, username: string) => {
    try {
        const response = await axiosInstance.post('/users', { uuid, email, username });
        const { success, message, data } = response.data;
        return data;
    } catch (error) {
       throw new CustomError('Error creating user in database.', 'user-create-error');
    }
};

// Fetch user data from the database
const fetchUserFromDatabase = async (uuid: string) => {
    try {
        const response = await axiosInstance.get(`/users/${uuid}`);
        const { success, message, data } = response.data;
        return data;
    } catch (error) {
        throw new CustomError('Error fetching user data from database.', 'user-fetch-error');
    }
};

// Sync user data if needed
const syncUserData = async (firebaseUser: any, localUser: any) => {
    try {
        const updates: any = {};
        if (localUser.avatar && firebaseUser.photoURL !== localUser.avatar) {
            updates.photoURL = localUser.avatar;
        }

        if (localUser.username && firebaseUser.displayName !== localUser.username) {
            updates.displayName = localUser.username;
        }

        if (Object.keys(updates).length > 0) {
            await updateProfile(firebaseUser, updates);
        }
    } catch (error) {
        throw new CustomError('Error syncing user data.', 'user-sync-error');
    }
};