<template>
    <div class="rounded-xl bg-slate-50 p-4 flex flex-col">
        <div class="flex justify-between">
            <p class="text-gray-500">{{ location }}</p>
            <p class="text-gray-500">{{ overallRating }} <i class="fa-solid fa-star"></i></p>
        </div>
        <h2 class="text-gray-800 text-xl font-bold mb-2">{{ name }}</h2>
        <p class="text-gray-700 mb-4">{{ company }}</p>
        <div class="mt-auto flex justify-end">
            <RouterLink 
                :to="`/tournaments/${id}`" 
                class="bg-sky-700 text-white px-4 py-2 rounded-full hover:bg-sky-500 duration-200">
                <i class="fa-brands fa-readme"></i>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define props for the TournamentCard component
const props = defineProps<{
    id: string;
    name: string;
    location: string;
    company: string;
    overallRating: Number;
}>();
</script>

<style scoped>
/* Scoped styles */
</style>