<template>
  <main class="container">
    <div class="w-auto mx-auto">
      <div
        class="mt-5 mb-10 flex flex-col items-center text-center min-h-[80vh] justify-evenly"
      >
        <div>
          <p class="pb-2">YHT Reviews Beta</p>
          <h1 class="md:pb-10 pb-5 text-4xl md:text-5xl font-semibold">
            Plan. Play. <br />Review & Connect.
          </h1>
        </div>
        <img
          class="md:pb-10 pb-5 object-fit rounded-full"
          src="../assets/celebrate.webp"
          alt="hockey team celebration gif"
        />

        <p class="md:w-1/2 mx-auto md:text-xl text-gray-400">
          Explore hockey-specific reviews on hotels, restaurants, rinks, and
          activities so your team’s experience is as smooth off the ice as it is
          on. Whether you’re looking to discover or review, your journey starts
          here.
        </p>

        <div class="flex flex-row gap-5 pt-5">
          <RouterLink :to="{ name: 'tournaments' }">
            <BaseButton label="Tournaments" variant="primary" />
          </RouterLink>
          <RouterLink :to="{ name: 'about' }">
            <BaseButton label="Learn More" variant="linkSecondary" />
          </RouterLink>
        </div>
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
