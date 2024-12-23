<!-- src/lib/ui/ProgressBar.vue -->

<template>
  <div v-if="visible" class="fixed top-0 left-0 w-full z-50">
    <div
      class="h-1 bg-blue-500 animate-progress"
      :style="{ width: progressWidth }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

// Props to control the progress bar
const props = defineProps<{
  start?: boolean
  finish?: boolean
}>()

const visible = ref(false)
const progressWidth = ref('0%')

let timer: number | undefined

watch(
  () => props.start,
  newVal => {
    if (newVal) {
      startProgress()
    }
  },
)

watch(
  () => props.finish,
  newVal => {
    if (newVal) {
      finishProgress()
    }
  },
)

const startProgress = () => {
  visible.value = true
  progressWidth.value = '0%'
  // Simulate progress
  progressWidth.value = '30%'
  // After a short delay, increase the progress
  timer = window.setTimeout(() => {
    progressWidth.value = '60%'
  }, 500)
  timer = window.setTimeout(() => {
    progressWidth.value = '90%'
  }, 1000)
}

const finishProgress = () => {
  progressWidth.value = '100%'
  // Hide the progress bar after a short delay to allow the animation to complete
  timer = window.setTimeout(() => {
    visible.value = false
    progressWidth.value = '0%'
  }, 300)
}

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
/* Define the animation for the progress bar */
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-progress {
  animation: progress 1.5s linear infinite;
}
</style>
