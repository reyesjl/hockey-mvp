<template>
  <div class="flex justify-between items-start rounded-lg shadow-md my-2">
    <!-- Email and Comment in a flex column -->
    <div class="flex flex-col">
      <p class="text-sm font-semibold text-white">{{ email }}</p>
      <p class="text-sm text-gray-200 mt-1">{{ comment }}</p>
    </div>

    <!-- Rating and Heart -->
    <div class="flex flex-col text-white">
      <span>
        <i class="fa-solid fa-star"></i>
      </span>
      <span class="ml-1">{{ rating }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props for the Review component
const props = defineProps<{
  email: string;
  rating: number;
  comment: string;
}>();
</script>

<style scoped>
/* No additional styles needed, using Tailwind CSS */
</style>
