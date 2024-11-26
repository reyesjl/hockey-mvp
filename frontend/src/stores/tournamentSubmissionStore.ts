// src/store/tournamentSubmissionStore.ts
import { defineStore } from 'pinia';

export const useTournamentSubmissionStore = defineStore('tournamentSubmissionStore', {
    state: () => ({
        submissions: [],
        loading: false,
        error: null as string | null,  // Explicitly define error as string | null
    }),
    actions: {
        async fetchTournamentSubmissions() {
            this.loading = true;
            this.error = null;

            try {
                const url = 'http://localhost:5000/api/v1/tournament-submissions/';
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tournament submissions');
                }

                const { success, message, data } = await response.json(); // Destructure the response to match the new format

                if (success) {
                    this.submissions = data; // Assuming the data contains the tournament submissions
                } else {
                    this.error = message || 'Failed to fetch tournament submissions';
                }

            } catch (error) {
                this.error = 'An error occurred while fetching submissions';
                console.log('Error fetching submissions:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});
