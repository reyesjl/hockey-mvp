// src/store/adminDashboardStore.ts
import { defineStore } from 'pinia'
import { axiosInstance } from '@/config/apiConfig'

export const useAdminDashboardStore = defineStore('adminDashboard', {
  state: () => ({
    tournamentCount: 0,
    tournamentSubmissionCount: 0,
    flagCount: 0,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAdminMetrics() {
      this.loading = true
      this.error = null

      try {
        const response = await axiosInstance.get('/admin/metrics')
        const { success, message, data } = response.data

        if (success) {
          this.tournamentCount = data.tournamentCount
          this.tournamentSubmissionCount = data.tournamentSubmissionCount
          this.flagCount = data.flagCount
        } else {
          this.error = message || 'Failed to fetch metrics'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching metrics'
        console.error('Error fetching admin metrics:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
