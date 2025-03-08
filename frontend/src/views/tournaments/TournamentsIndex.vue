<!-- 
    Youth Hockey Tournaments

    Author: Jose Reyes
    Date: Dec 27, 2025

    Copyright © 2025 Jose Reyes. All rights reserved.

    This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
    in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.

    This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
    Any unauthorized use may result in legal action.

    For inquiries regarding licensing or permissions, please contact Jose Reyes.
-->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { axiosInstance } from "@/config/apiConfig";
import type { Tournament } from "@/types";
import { getGenderIcon } from "@/utils/tournaments";

// State variables
const tournaments = ref<Tournament[]>([]);
const totalTournaments = ref<number>(0);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

// Fetch tournaments on mount
onMounted(async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get('/tournaments');
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    tournaments.value = data.tournaments;
    totalTournaments.value = data.totalTournaments;
  } catch (err) {
    error.value = "Error loading tournaments.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <main class="pt-[3.125rem]">
        <div class="container max-w-7xl">
            <div class="mt-10 md:mt-16 flex gap-2 items-center justify-between md:justify-normal mb-4">
                <h1 class="text-2xl font-bold">{{ totalTournaments }} tournaments</h1>
                <RouterLink class="text-white bg-black hover:bg-gray-400 hover:shadow-none duration-200 rounded-full shadow-lg p-1 px-2" :to="`/tournaments/create`">
                    Create 
                </RouterLink>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-gray-500">Loading tournaments...</div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-500">{{ error }}</div>

            <!-- Display Tournaments -->
            <ul v-else-if="tournaments.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <li v-for="tournament in tournaments" :key="tournament._id" class="mb-2 p-1 border border-gray-300 rounded-lg shadow-md">
                <div class="bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg p-2">
                    <div class="font-semibold text-sm">{{ tournament.company.name }}</div>
                    <h2 class="text-xl uppercase">{{ tournament.name }}</h2>
                    <div class="w-fit bg-black text-xs text-white flex items-center rounded-full py-1 px-2 mt-2" v-html="getGenderIcon(tournament.gender)"></div>
                </div>
                <div class="flex justify-between items-center pt-2 text-sm font-semibold">
                    <div><i class="fa-solid fa-location-dot"></i> {{ tournament.location.city }}, {{ tournament.location.state }}</div>
                    <div>{{ tournament.ratings.overall }} <i class="fa fa-star" aria-hidden="true"></i></div>
                </div>
                <div class="mb-1 mt-2 flex justify-end">
                    <RouterLink class="text-white bg-black hover:bg-gray-400 hover:shadow-none duration-200 rounded-full shadow-lg p-1 px-2" :to="`/tournaments/${tournament._id}`">
                        Details
                    </RouterLink>
                </div>
            </li>
            </ul>

            <!-- Empty State -->
            <div v-else class="text-gray-500">No tournaments available.</div>
        </div>
    </main>
</template>
