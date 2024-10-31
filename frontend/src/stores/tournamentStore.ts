// src/store/tournamentStore.js
import { defineStore } from 'pinia';

export const useTournamentStore = defineStore('tournament', {
    state: () => ({
        tournaments: [],
    }),
    actions: {
        async fetchTournaments() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/tournaments');
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
