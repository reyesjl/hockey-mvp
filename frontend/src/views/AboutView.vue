<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl pb-20">
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-8xl font-semibold">About Us</h1>
      </header>
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Youth Hockey Tournament Reviews</h1>
        <p class="mb-2">
          We are a group of hockey enthusiasts and developers who built this
          platform to help the hockey community find reliable tournaments. We
          are not affiliated with any big hockey organizations; this is a
          public, passion-driven project.
        </p>
        <p>
          The Hockey Tournament Review Platform allows parents, players,
          coaches, and fans to review tournaments and share their experiences.
          Our goal is to provide transparency, improve event quality, and give
          everyone a voice in the hockey world.
        </p>
      </section>

      <section class="mb-5">
        <h1 class="text-xl font-semibold">Our Purpose</h1>
        <p>
          We aim to make it easier for players and coaches to find tournaments
          that meet their needs. With so many events available, our platform
          helps users make informed decisions through reviews, ratings, and
          shared experiences.
        </p>
      </section>

      <section class="mb-5">
        <h1 class="text-xl font-semibold">Why This Platform Matters</h1>
        <p>
          We understand the frustration of limited or unreliable information. By
          aggregating community-driven feedback, tournament details, and nearby
          amenities, we bring transparency to the decision-making process.
        </p>
      </section>

      <section class="mb-5">
        <h1 class="text-xl font-semibold">Join the Community</h1>
        <p class="mb-5">
          Built with love for the hockey community, your participation keeps
          this platform thriving. Whether you’re submitting a new tournament,
          leaving a review, or browsing, you help improve the experience for
          everyone.
        </p>

        <div class="flex gap-2">
          <RouterLink :to="{ name: 'signup' }">
            <BaseButton label="Sign Up" variant="primary" />
          </RouterLink>
          <RouterLink :to="{ name: 'community' }">
            <BaseButton label="Our Community" variant="linkSecondary" />
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
