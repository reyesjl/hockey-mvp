<template>
  <main class="pt-[3.125rem]">
    <!-- Search bar section -->
    <div class="search-wrapper flex flex-col mt-10 md:mt-16 pb-8 gap-4">
      <h1 class="md:text-5xl text-2xl font-bold">Search and listing</h1>
      <div class="search-bar md:w-1/2 w-full mb-2">
        <!-- Bind searchQuery to the input using v-model -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter location or tournament name"
          class="rounded-full w-full text-black px-4 py-2 outline-none border-none shadow-md focus:shadow-xl"
        />
      </div>
      <RouterLink
        v-if="tournamentStore.tournaments.length > 0"
        :to="{ name: 'createTournamentSubmission' }"
      >
        <BaseButton
          class="shadow-md"
          label="New Tournament"
          variant="primary"
        />
      </RouterLink>
    </div>

    <!-- Loading spinner state -->
    <div v-if="tournamentStore.loading" class="text-center mt-6">
      <i class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"></i>
    </div>

    <!-- Error message -->
    <div v-if="tournamentStore.error" class="text-center mt-6">
      <p class="text-red-500">{{ tournamentStore.error }}</p>
    </div>

    <!-- No results found message -->
    <div
      v-else-if="
        !tournamentStore.loading && tournamentStore.tournaments.length === 0
      "
      class="text-center mt-6"
    >
      <p class="text-gray-500">
        No tournaments found. Try a different search term.
      </p>
      <div class="mt-5">
        <RouterLink :to="{ name: 'createTournamentSubmission' }">
          <BaseButton label="New Tournament" variant="primary" />
        </RouterLink>
      </div>
    </div>

    <!-- Tournament cards -->
    <div
      v-else-if="
        !tournamentStore.loading && tournamentStore.tournaments.length > 0
      "
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pb-20"
    >
      <TournamentCard
        v-for="tournament in tournamentStore.tournaments"
        :key="tournament._id"
        :id="tournament._id"
        :name="tournament.name"
        :location="tournament.location"
        :company="tournament.company"
        :overallRating="tournament.overallRating"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useTournamentStore } from '@/stores/tournamentStore'
import TournamentCard from '@/components/TournamentCard.vue'
import { debounce } from 'lodash'
import BaseButton from '@/lib/ui/BaseButton.vue'

const tournamentStore = useTournamentStore()
const searchQuery = ref('')

// Fetch tournaments when the component is mounted
onMounted(async () => {
  await tournamentStore.fetchTournaments()
})

// Debounced function to fetch tournaments with search query
const fetchTournamentsDebounced = debounce(async (newQuery: string) => {
  await tournamentStore.fetchTournaments(newQuery)
}, 800)

// Watch the searchQuery and apply debounce for search input
watch(searchQuery, newQuery => {
  fetchTournamentsDebounced(newQuery)
})
</script>

<style>
/* Tailwind CSS is handling most of the styling, scoped styles can be omitted if unnecessary */
</style>
