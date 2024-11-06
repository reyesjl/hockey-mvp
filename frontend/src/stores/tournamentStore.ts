// src/store/tournamentStore.js
import { defineStore } from 'pinia';

export const useTournamentStore = defineStore('tournament', {
    state: () => ({
        tournaments: [],
    }),
    actions: {
        async fetchTournaments(searchTerm = '') {
            try {
                const url = `http://localhost:5000/api/v1/tournaments${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.tournaments = await response.json();
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        },
    },
});
