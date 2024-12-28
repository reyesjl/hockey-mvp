// src/store/tournamentStore.ts
import { defineStore } from 'pinia'
import type { Tournament } from '@/types'
import { axiosInstance } from '@/config/apiConfig'

export const useTournamentStore = defineStore('tournament', {
  state: () => ({
    tournaments: [] as Tournament[], // Array of tournaments
    loading: false, // Loading state for UI
    error: null as string | null, // Error state for UI
  }),
  actions: {
    async fetchTournaments(searchTerm = '') {
      this.loading = true
      this.error = null

      try {
        const url = `/tournaments${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`
        const response = await axiosInstance.get(url)
        const { success, message, data } = response.data

        if (success) {
          this.tournaments = data
        } else {
          throw new Error(message || 'Failed to fetch tournaments')
        }
      } catch (error) {
        this.error = 'An error occurred while fetching tournaments'
        console.error('Error fetching tournaments:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
