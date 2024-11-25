// src/store/tournamentStore.ts
import { defineStore } from 'pinia';
import type { Tournament } from '@/types';

export const useTournamentStore = defineStore('tournament', {
    state: () => ({
        tournaments: [] as Tournament[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchTournaments(searchTerm = '') {
            this.loading = true;
            this.error = null;

            try {
                const url = `http://localhost:5000/api/v1/tournaments${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tournaments');
                }

                const data: Tournament[] = await response.json();
                this.tournaments = data;
            } catch (error) {
                this.error = 'An error occured while fetching tournaments';
                console.error('Error fetching tournaments:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});
