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

        const data = await response.json();
        this.submissions = data;
      } catch (error) {
        this.error = 'An error occured while fetching submissions';
        console.log('Error fetching submissions:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
