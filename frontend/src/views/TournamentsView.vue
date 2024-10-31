<script setup lang="ts">
import { onMounted } from 'vue';
import { useTournamentStore } from '../stores/tournamentStore';
import PageHeader from '@/components/PageHeader.vue';

const tournamentStore = useTournamentStore();

// Fetch tournaments when the component is mounted
onMounted(() => {
    tournamentStore.fetchTournaments();
});
</script>

<template>
    <main>
        <PageHeader 
            title="Tournaments"
            description="Explore a comprehensive list of tournaments submitted by the community. Can’t find a tournament? Add it yourself! Share your experience by leaving a review and help others make informed choices."
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mx-auto w-[92%]">
            <div
                v-for="tournament in tournamentStore.tournaments"
                :key="tournament._id"
                class="bg-gray-600 shadow-lg rounded-lg p-4 flex flex-col"
            >
                <h2 class="text-white text-xl font-bold mb-2">{{ tournament.name }}</h2>
                <p class="text-gray-700 mb-4">{{ tournament.description }}</p>
                <div class="mt-auto">
                    <router-link
                        :to="`/tournaments/${tournament._id}`"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        View Details
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
/* You can remove scoped styles as needed since you are using Tailwind CSS */
</style>

