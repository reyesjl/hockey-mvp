// src/store/adminDashboardStore.js
import { defineStore } from 'pinia';

export const useAdminDashboardStore = defineStore('adminDashboard', {
    state: () => ({
        tournamentCount: 0,
        tournamentSubmissionCount: 0,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchAdminMetrics() {
            this.loading = true;
            this.error = null;

            try {
                const response = await fetch('http://localhost:5000/api/v1/admin/metrics');
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch admin metrics');
                }

                const data = await response.json();
                this.tournamentCount = data.tournamentCount;
                this.tournamentSubmissionCount = data.tournamentSubmissionCount;
            } catch (error) {
                this.error = 'An error occured while fetching metrics';
                console.error('Error fetching admin metrics:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});