import { ref } from 'vue'
import { axiosInstance } from '@/config/apiConfig'
import type { Tournament } from '@/types'

export function useTournament() {
  const tournament = ref<Tournament | null>(null)
  const isTournamentLoading = ref(true)
  const error = ref<string | null>(null)

  const fetchTournamentById = async (tournamentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/tournaments/${tournamentId}`,
      )

      // The response structure is consistent, check for success
      if (response.data.success) {
        tournament.value = response.data.data
      } else {
        error.value = 'Failed to fetch tournament details.'
      }
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch tournament details.'
    } finally {
      isTournamentLoading.value = false
    }
  }

  return {
    tournament,
    isTournamentLoading,
    error,
    fetchTournamentById,
  }
}
