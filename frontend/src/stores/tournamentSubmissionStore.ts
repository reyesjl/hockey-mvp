// src/store/tournamentSubmissionStore.ts
import { defineStore } from 'pinia'
import { axiosInstance } from '@/config/apiConfig'

export const useTournamentSubmissionStore = defineStore(
  'tournamentSubmissionStore',
  {
    state: () => ({
      submissions: [],
      loading: false,
      error: null as string | null, // Explicitly define error as string | null
    }),
    actions: {
      async fetchTournamentSubmissions() {
        this.loading = true
        this.error = null

        try {
          const response = await axiosInstance.get('/tournament-submissions/')
          const { success, message, data } = response.data

          if (success) {
            this.submissions = data // Assuming the data contains the tournament submissions
          } else {
            this.error = message || 'Failed to fetch tournament submissions'
          }
        } catch (error) {
          this.error = 'An error occurred while fetching submissions'
          console.log('Error fetching submissions:', error)
        } finally {
          this.loading = false
        }
      },

      async submitTournament(tournamentData: any) {
        this.loading = true
        this.error = null

        try {
          const response = await axiosInstance.post('/tournament-submissions/', tournamentData)
          const { success, message } = response.data

          if (!success) {
            throw new Error(message || 'Failed to submit tournament')
          }
        } catch (error) {
          this.error = 'An error occurred while submitting the tournament'
          console.log('Error submitting tournament:', error)
        } finally {
          this.loading = false
        }
      },
    },
  },
)
