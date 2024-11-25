<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useTournamentStore } from '../stores/tournamentStore';
import TournamentCard from '@/components/TournamentCard.vue';
import debounce from 'lodash/debounce';  // Import lodash debounce

const tournamentStore = useTournamentStore();
const searchQuery = ref('');
const isLoading = ref(false);

// Fetch tournaments when the component is mounted
onMounted(async () => {
    isLoading.value = true;
    await tournamentStore.fetchTournaments();
    isLoading.value = false;
});

// fetch tournaments with search
const fetchTournamentsDebounced = debounce(async (newQuery: string) => {
    await tournamentStore.fetchTournaments(newQuery);
    isLoading.value = false;  // Set isLoading to false after fetching
}, 800);

// Watch the searchQuery and apply debounce for search input
watch(searchQuery, (newQuery) => {
    isLoading.value = true;  // Immediately show the loading state
    fetchTournamentsDebounced(newQuery);  // Trigger debounced fetch
});
</script>

<template>
    <main class="container">
        <div class="search-wrapper flex flex-col items-center pt-5 pb-8 gap-4">
            <h1 class="md:text-5xl text-2xl font-bold">Tournaments</h1>
            <div class="search-bar md:w-1/2 w-full mb-2">
                <!-- Bind searchQuery to the input using v-model -->
                <input v-model="searchQuery" type="text" placeholder="Enter location or tournament name"
                    class="rounded-full w-full text-black px-4 py-2 outline-none border-none" />
            </div>
            <RouterLink v-if="tournamentStore.tournaments.length > 0" to="/tournaments/submit"
                class="bg-black text-white md:px-5 px-3 md:py-2 py-1 rounded-full hover:bg-white border-solid border-2 border-white hover:text-black duration-200">
                + New Tournament
            </RouterLink>
        </div>

        <!-- Show loading state -->
        <div v-if="isLoading" class="text-center mt-6">
            <div class="flex justify-center items-center space-x-2">
                <!-- Spinner Icon with Tailwind animation -->
                <i class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"></i>
            </div>
        </div>

        <!-- Conditional rendering for no results -->
        <div v-if="tournamentStore.tournaments.length === 0 && !isLoading" class="text-center mt-6">
            <p class="text-gray-500">No tournaments found. Try a different search term.</p>
            <div class="mt-5">
                <RouterLink to="/tournaments/submit"
                    class="bg-black text-white md:px-5 px-3 md:py-2 py-1 rounded-full hover:bg-white border-solid border-2 border-white hover:text-black duration-200">
                    + New Tournament
                </RouterLink>
            </div>
        </div>

        <!-- Only show tournament cards when not loading -->
        <div v-else-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pb-20">
            <TournamentCard v-for="tournament in tournamentStore.tournaments" :key="tournament._id" :id="tournament._id"
                :name="tournament.name" :location="tournament.location" :company="tournament.company"
                :overallRating="tournament.overallRating" />
        </div>
    </main>
</template>

<style>
/* You can remove scoped styles as needed since you are using Tailwind CSS */
</style>