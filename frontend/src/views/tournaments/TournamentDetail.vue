<template>
  <main>
    <div class="max-w-4xl mx-auto px-4 py-6" v-if="tournament">
      <!-- Tournament Header Section -->
      <div
        class="bg-gradient-to-b from-sky-300 to-sky-100 py-4 px-3 rounded-xl text-black"
      >
        <div class="flex justify-between items-center mb-6">
          <!-- Location -->
          <div class="flex justify-between align-middle w-full">
            <p class="py-1 px-2 bg-black text-white rounded-full shadow-lg">
              <i class="fa-solid fa-location-arrow"></i>
              {{ tournament.location }}
            </p>
          </div>
        </div>

        <!-- Tournament Title -->
        <h1 class="text-3xl font-bold mb-4">{{ tournament.name }}</h1>

        <!-- Company Name  -->
        <div class="flex justify-between items-end">
          <div>
            <div class="text-lg italic">
              <i class="fa-regular fa-building"></i> {{ tournament.company }}
            </div>
            <div class="text-sm italic">
              <i class="fa-solid fa-envelope"></i> {{ tournament.contactEmail }}
            </div>
          </div>
          <!-- Flag Button -->
          <RouterLink
            :to="{
              name: 'createTournamentFlag',
              params: { tournamentId: tournament._id },
            }"
          >
            <BaseButton
              label="Flag"
              variant="danger"
              iconRight="fa-solid fa-flag"
              raised="lg"
            />
          </RouterLink>
        </div>
        <div>
          <p></p>
        </div>
      </div>

      <!-- Main statistics drawer -->
      <TournamentStatsDrawer :tournament="tournament" />

      <!-- Dates / Events -->
      <div class="py-3 border-gray-700 border-t-2 border-solid">
        <h3 class="text-white font-semibold text-xl">Dates</h3>
        <p v-if="formattedDates.length" class="text-sky-500 uppercase text-xs">
          happening now
        </p>
        <p v-else class="text-gray-500 text-xs">No upcoming dates</p>
        <div class="flex gap-2 mt-2">
          <div
            v-for="(date, index) in formattedDates"
            :key="index"
            class="flex flex-col min-w-fit items-center p-2 bg-white rounded-md"
          >
            <div class="text-xs text-black uppercase">{{ date.month }}</div>
            <div class="text-3xl text-black font-semibold">{{ date.day }}</div>
          </div>
        </div>
      </div>

      <!-- Show loading spinner for tournament and reviews -->
      <div v-if="isTournamentLoading" class="text-center mt-6">
        <div class="flex justify-center items-center space-x-2">
          <i
            class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"
          ></i>
        </div>
        <p class="text-white">Loading tournament...</p>
      </div>

      <div v-else-if="isReviewsLoading && tournament" class="text-center mt-6">
        <div class="flex justify-center items-center space-x-2">
          <i
            class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"
          ></i>
        </div>
        <p class="text-white">Loading reviews...</p>
      </div>

      <!-- Once both tournament and reviews are loaded -->
      <div v-else>
        <!-- Reviews Section -->
        <div
          v-if="reviews && reviews.length"
          class="max-w-4xl mt-8 mx-auto reviews-section pb-6"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-white">Rating & Reviews</h2>
            <!-- <RouterLink :to="{ name: 'createTournamentReview', params: { tournamentId: tournament._id } }"
							class="bg-black border-solid border-white border-2 text-white px-3 py-1 rounded-full hover:bg-white hover:text-black duration-200 ml-2">
							New Review <i class="fa-solid fa-comments"></i>
						</RouterLink> -->
          </div>

          <div class="flex md:justify-normal justify-between items-center mt-4">
            <div class="text-6xl text-white font-semibold md:mr-4">
              {{ tournament.overallRating }}
            </div>
            <div class="text-sm text-gray-300 flex flex-col items-end gap-1">
              <div class="flex gap-2">
                <RatingStars :rating="tournament.overallRating" />
              </div>
              <div class="text-gray-500">100K Ratings</div>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="mt-4 mb-2 font-semibold">Most Recent Reviews</div>
          <div
            v-for="review in reviews"
            :key="review._id"
            class="flex flex-col"
          >
            <Review
              :email="review.submittedBy"
              :rating="review.overallRating"
              :comment="review.comment"
              :attendedDate="review.attendedDate"
            />
          </div>
        </div>

        <!-- No Reviews Found State -->
        <div v-else class="flex flex-col items-center">
          <p class="mb-4 text-center text-gray-300">
            No reviews exist yet. Be the first to leave a review!
          </p>
          <RouterLink
            :to="{
              name: 'createTournamentReview',
              params: { tournamentId: tournament._id },
            }"
            class="mb-4 w-fit border-solid border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black duration-200 ml-2"
          >
            New Review <i class="fa-solid fa-comments"></i>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useTournament } from '@/composables/useTournament'
import { useReviews } from '@/composables/useReviews'
import { useRoute } from 'vue-router'
import BaseButton from '@/lib/ui/BaseButton.vue'
import Review from '@/components/Review.vue'
import RatingStars from '@/components/Tournaments/RatingStars.vue'
import TournamentStatsDrawer from '@/components/Tournaments/TournamentStatsDrawer.vue'

export default defineComponent({
  components: {
    Review,
    RatingStars,
    TournamentStatsDrawer,
    BaseButton,
  },
  setup() {
    // Accessing the route params
    const route = useRoute()
    const tournamentId = route.params.tournamentId as string

    // Detail toggle
    const showContent = ref(true)

    // Using composables
    const { tournament, isTournamentLoading, fetchTournamentById } =
      useTournament()
    const { reviews, isReviewsLoading, fetchReviewsByTournamentId } =
      useReviews()

    const notesExpanded = ref(false)
    const maxNotesLength = 120 // Max characters before truncating

    const displayedNotes = computed(() => {
      if (!tournament.value?.notes) return 'No additional notes'
      return notesExpanded.value
        ? tournament.value.notes
        : `${tournament.value.notes.slice(0, maxNotesLength)}${tournament.value.notes.length > maxNotesLength ? '...' : ''}`
    })

    const toggleExpandNotes = () => {
      notesExpanded.value = !notesExpanded.value
    }

    const toggleContent = (event: { currentTarget: any }) => {
      // Access the clicked header and corresponding content and icon
      const header = event.currentTarget
      const content = header.nextElementSibling
      const icon = header.querySelector('.toggle-icon')

      // Toggle visibility
      content.classList.toggle('hidden')
      icon.classList.toggle('fa-plus')
      icon.classList.toggle('fa-minus')
    }

    // Fetch tournament and reviews when the component is mounted
    onMounted(async () => {
      if (tournamentId) {
        await fetchTournamentById(tournamentId)
        await fetchReviewsByTournamentId(tournamentId)
      }
    })

    const formattedDates = computed(() => {
      if (!tournament.value?.dates?.length) return []
      return tournament.value.dates.map(date => {
        const eventDate = new Date(date)
        return {
          month: eventDate
            .toLocaleDateString('en-US', { month: 'short' })
            .toUpperCase(),
          day: eventDate.getDate(),
        }
      })
    })

    return {
      tournament,
      isTournamentLoading,
      reviews,
      isReviewsLoading,
      formattedDates,
      showContent,
      notesExpanded,
      displayedNotes,
      toggleExpandNotes,
      toggleContent,
    }
  },
})
</script>

<style scoped></style>
