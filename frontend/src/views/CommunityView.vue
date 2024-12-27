<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl pb-20">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Community</h1>
      </header>

      <!-- Community Overview Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">
          Connect with Fellow Hockey Enthusiasts
        </h2>
        <p class="mb-2">
          Join our vibrant community of parents, players, coaches, and fans who
          are passionate about hockey. Share your experiences, ask questions,
          and stay updated with the latest tournament news.
        </p>
      </section>

      <!-- Tournament Submission Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Submit Tournaments</h2>
        <p>
          Easily submit new tournaments to our platform. Provide essential
          details such as location, date, and event specifics to help others
          find and review your tournaments.
        </p>
      </section>

      <!-- Flagging System Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Flagging System</h2>
        <p>
          Report any inaccuracies or outdated information using our flagging
          system. This ensures our platform remains reliable and up-to-date for
          everyone.
        </p>
      </section>

      <!-- Review System Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Leave Reviews</h2>
        <p>
          Provide feedback on tournaments you’ve attended. Your honest reviews
          help others make informed decisions and improve the quality of events
          in our community.
        </p>
      </section>

      <!-- Approval Process Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Approval Process</h2>
        <p>
          Every submission goes through our approval process to maintain high
          standards. Our admin team ensures all content is accurate and valuable
          for the community.
        </p>
      </section>

      <!-- Community Call to Action -->
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Join the Community</h1>
        <p class="mb-5">
          Your participation keeps this platform thriving. Whether you’re
          submitting a tournament, leaving a review, or exploring events, you
          help improve the experience for everyone.
        </p>

        <div class="flex gap-2">
          <RouterLink :to="{ name: 'signup' }">
            <BaseButton label="Sign Up" variant="primary" />
          </RouterLink>
          <RouterLink :to="{ name: 'support' }">
            <BaseButton label="Support" variant="linkSecondary" />
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
