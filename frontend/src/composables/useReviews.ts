import { ref } from 'vue'
import axios from 'axios'
import type { Review } from '@/types'

export function useReviews() {
  const reviews = ref<Review[]>([])
  const isReviewsLoading = ref(true)
  const error = ref<string | null>(null)

  const fetchReviewsByTournamentId = async (tournamentId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/reviews/tournament/${tournamentId}`,
      )

      // The response structure is consistent, check for success
      if (response.data.success) {
        reviews.value = response.data.data
      } else {
        error.value = 'Failed to fetch reviews.'
      }
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch reviews.'
    } finally {
      isReviewsLoading.value = false
    }
  }

  return {
    reviews,
    isReviewsLoading,
    error,
    fetchReviewsByTournamentId,
  }
}
