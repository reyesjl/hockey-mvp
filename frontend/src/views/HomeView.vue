<template>
  <main class="min-h-screen pt-[3.125rem]">
    <header
      class="mt-10 md:mt-16 grid grid-cols-12 justify-items-center text-center"
    >
      <div class="col-span-12">
        <p class="font-semibold text-xs">YHT REVIEWS BETA v1.0</p>
        <h1 class="text-4xl md:text-6xl font-semibold">
          Plan. Play. <br />Review & Connect.
        </h1>
      </div>
    </header>
    <div class="container">
      <div class="mt-5 flex justify-center">
        <img
          class="object-fill rounded-full"
          src="../assets/celebrate.webp"
          alt="hockey team celebration gif"
        />
      </div>
    </div>

    <div class="mt-5 flex justify-center text-center">
      <p class="text-balance max-w-lg md:text-xl">
        Explore hockey-specific reviews on hotels, restaurants, rinks, and
        activities so your team’s experience is as smooth off the ice as it is
        on. Whether you’re looking to discover or review, your journey starts
        here.
      </p>
    </div>

    <div class="flex flex-col items-center text-center h-full mb-8">
      <div class="flex flex-row gap-5 pt-5">
        <RouterLink :to="{ name: 'tournaments' }">
          <BaseButton label="Tournaments" variant="primary" />
        </RouterLink>
        <RouterLink :to="{ name: 'about' }">
          <BaseButton label="Learn More" variant="linkSecondary" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/lib/ui/BaseButton.vue'

const isLoading = ref(false)

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}

const handleClick = () => {
  alert('Button has been clicked!')
}
</script>

<style scoped></style>
