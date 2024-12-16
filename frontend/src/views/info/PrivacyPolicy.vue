<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-8xl font-extrabold">Privacy Policy</h1>
      </header>

      <!-- Introduction Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Your Privacy Matters</h2>
        <p class="mb-2">
          At YHT Reviews, we are committed to protecting your privacy. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information.
        </p>
      </section>

      <!-- Information We Collect Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your email
          address, password, and any reviews or submissions you make on the
          platform.
        </p>
      </section>

      <!-- How We Use Information Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">How We Use Information</h2>
        <p>
          The information we collect is used to operate, maintain, and improve
          our platform, communicate with you, and personalize your experience.
        </p>
      </section>

      <!-- Data Security Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <!-- Your Choices Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Your Choices</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You can manage your account settings or contact us for
          assistance.
        </p>
      </section>

      <!-- Call to Action Section -->
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Need assistance?</h1>
        <p class="mb-5">
          If you have any questions about these policies, please reach out to our support team.
        </p>

        <div class="flex gap-2">
          <RouterLink :to="{ name: 'home' }">
            <BaseButton label="Contact" variant="primary" />
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
