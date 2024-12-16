<!-- src/components/Badge.vue -->

<template>
  <span :class="badgeClasses">
    <slot>Badge</slot>
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

// Define the props with allowed color options
const props = defineProps<{
  color?:
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'orange'
}>()

// Default to 'gray' if no color is provided
const color = props.color || 'gray'

// Compute the classes based on the color prop
const badgeClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    red: 'bg-red-50 text-red-700 ring-red-600/10',
    yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    green: 'bg-green-50 text-green-700 ring-green-600/20',
    blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
    purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
    pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
    orange: 'bg-orange-50 text-orange-700 ring-orange-700/10',
  }

  // Fallback to 'gray' if an invalid color is provided
  return `${baseClasses} ${colorClasses[color] || colorClasses['gray']}`
})
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS handles styling */
</style>
