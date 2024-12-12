import { ref } from 'vue'
import axios from 'axios'
import type { Tournament } from '@/types'

export function useTournament() {
  const tournament = ref<Tournament | null>(null)
  const isTournamentLoading = ref(true)
  const error = ref<string | null>(null)

  const fetchTournamentById = async (tournamentId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/tournaments/${tournamentId}`,
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
