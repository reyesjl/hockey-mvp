<template>
    <div class="bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl p-4 flex flex-col">
        <div class="flex justify-between">
            <p class="py-1 px-2 bg-black text-white rounded-full shadow-md"><i class="fa-solid fa-location-arrow"></i> {{ location }}</p>
            <p class="text-black"><i class="fa-solid fa-heart"></i> {{ overallRating }}</p>
        </div>
        <h2 class="text-black text-xl font-bold my-2">{{ name }}</h2>
        <p class="mb-4 italic text-black"><i class="fa-regular fa-building"></i> {{ company }}</p>
        <div class="mt-auto flex justify-end">
            <RouterLink 
                :to="`/tournaments/${id}`" 
                class="bg-white text-black px-4 py-2 rounded-full hover:bg-black hover:text-white duration-200 shadow-lg">
                <div class="flex align-middle gap-2">
                    <div>More</div>
                    <div><i class="fa-solid fa-circle-info"></i></div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define props for the TournamentCard component
const props = defineProps<{
    id: string;
    name: string;
    location: string;
    company: string;
    overallRating: Number;
}>();

const bgClass = ref('');

// Set a random background color when the component is mounted
onMounted(() => {
    const colors = ['bg-yellow-400', 'bg-green-600', 'bg-orange-600'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    bgClass.value = colors[randomIndex];
});

</script>

<style scoped>
/* Scoped styles */
</style>