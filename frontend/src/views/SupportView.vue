<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl pb-20">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Support</h1>
      </header>

      <!-- Support Overview Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">We're Here to Help</h2>
        <p class="mb-2">
          Whether you have questions about using the platform, need assistance
          with your account, or want to provide feedback, our support team is
          ready to assist you.
        </p>
      </section>

      <!-- How You Can Help Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">How You Can Help</h2>
        <p>
          Your donations help us cover hosting costs, enhance features, and keep
          tournament information up-to-date. Every contribution, big or small,
          makes a difference.
        </p>
        
        <a class="mt-2 block bg-yellow-400 shadow-md hover:shadow-none hover:bg-yellow-300 duration-300 py-2 px-3 font-semibold w-fit rounded-full" href="https://www.buymeacoffee.com/josereyes9x">
        ☕ Get the software guy a coffee 
        </a>

      </section>

      <!-- Why It Matters Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Why Your Support Matters</h2>
        <p>
          By supporting this platform, you’re ensuring parents, players,
          coaches, and fans have access to reliable tournament reviews and
          information, making their decisions easier and the hockey community
          stronger.
        </p>
      </section>

      <!-- Call to Action Section -->
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Join Us. Make a Difference.</h1>
        <p class="mb-5">
          Your generosity helps us keep the platform free and accessible for
          everyone. Together, we can improve the hockey tournament experience
          for the whole community.
        </p>

        <div class="flex gap-2">
          <RouterLink :to="{ name: 'signup' }">
            <BaseButton label="Sign Up" variant="primary" />
          </RouterLink>
          <RouterLink :to="{ name: 'about' }">
            <BaseButton label="Read More" variant="linkSecondary" />
          </RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/lib/ui/BaseButton.vue'
</script>

<style scoped></style>
