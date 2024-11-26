// src/store/tournamentStore.ts
import { defineStore } from 'pinia';
import type { Tournament } from '@/types';

export const useTournamentStore = defineStore('tournament', {
    state: () => ({
        tournaments: [] as Tournament[],  // Array of tournaments
        loading: false,                    // Loading state for UI
        error: null as string | null,      // Error state for UI
    }),
    actions: {
        async fetchTournaments(searchTerm = '') {
            this.loading = true;
            this.error = null;

            try {
                // Construct the API URL with optional search parameter
                const url = `http://localhost:5000/api/v1/tournaments${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;
                const response = await fetch(url);

                // Check for HTTP success (status 200)
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tournaments');
                }

                // Parse the response as JSON
                const responseData = await response.json();

                // Check if the response is successful
                if (responseData.success) {
                    // Set tournaments to the 'data' field from the response
                    this.tournaments = responseData.data;
                } else {
                    throw new Error(responseData.message || 'Failed to fetch tournaments');
                }

            } catch (error) {
                // Handle any errors and set the error message
                this.error = 'An error occurred while fetching tournaments';
                console.error('Error fetching tournaments:', error);
            } finally {
                this.loading = false; // Set loading to false after the operation is complete
            }
        },
    },
});