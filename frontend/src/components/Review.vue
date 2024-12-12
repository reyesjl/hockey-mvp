<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-start">
      <!-- Email and Comment in a flex column -->
      <div class="flex flex-col">
        <p class="text-sm font-semibold text-white">{{ email }}</p>
        <p class="text-sm text-gray-200 mt-1">{{ comment }}</p>
      </div>

      <!-- Rating and Heart -->
      <div class="flex flex-col text-white text-center">
        <span>
          <i class="fa-solid fa-star"></i>
        </span>
        <span>{{ rating }}</span>
      </div>
    </div>

    <!-- Attended Date -->
    <div class="text-xs text-gray-400">
      <span>Attended {{ timeAgo }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// Add relative time plugin
dayjs.extend(relativeTime)

// Define props for the Review component
const props = defineProps<{
  email: string
  rating: number
  comment: string
  attendedDate: string
}>()

// Calculate the time ago string
const timeAgo = dayjs(props.attendedDate).fromNow()
</script>

<style scoped>
/* No additional styles needed, using Tailwind CSS */
</style>
