<template>
  <div
    class="bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl p-4 flex flex-col"
  >
    <div class="flex justify-between">
      <p class="py-1 px-2 bg-black text-white rounded-full shadow-md">
        <i class="fa-solid fa-location-arrow"></i> {{ location }}
      </p>
      <p class="text-black">
        <i class="fa-solid fa-heart"></i> {{ overallRating }}
      </p>
    </div>
    <h2 class="text-black text-xl font-bold my-2">{{ name }}</h2>
    <p class="mb-4 italic text-black">
      <i class="fa-regular fa-building"></i> {{ company }}
    </p>
    <div class="mt-auto flex justify-end">
      <RouterLink :to="`/tournaments/${id}`">
        <BaseButton
          label="More"
          variant="primary"
          iconRight="fa-solid fa-circle-info"
          raised="lg"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/lib/ui/BaseButton.vue'

// Define props for the TournamentCard component
const props = defineProps<{
  id: string
  name: string
  location: string
  company: string
  overallRating: number
}>()
</script>

<style scoped>
/* Scoped styles */
</style>
