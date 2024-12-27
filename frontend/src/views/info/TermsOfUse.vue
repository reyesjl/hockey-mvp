<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Terms of Use</h1>
      </header>

      <!-- Introduction Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Welcome to YHT Reviews</h2>
        <p class="mb-2">
          By accessing or using our platform, you agree to comply with and be
          bound by these Terms of Use. Please read them carefully.
        </p>
      </section>

      <!-- User Responsibilities Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">1. User Responsibilities</h2>
        <p>
          Users are expected to provide accurate information, respect other
          community members, and refrain from posting inappropriate content.
        </p>
      </section>

      <!-- Intellectual Property Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">2. Intellectual Property</h2>
        <p>
          All content on this platform, including text, graphics, logos, and
          software, is the property of YHT Reviews or its licensors and is
          protected by intellectual property laws.
        </p>
      </section>

      <!-- Limitation of Liability Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">3. Limitation of Liability</h2>
        <p>
          YHT Reviews is not liable for any damages arising from the use or
          inability to use the platform, including but not limited to direct,
          indirect, incidental, or consequential damages.
        </p>
      </section>

      <!-- Termination Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">4. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to the
          platform at our sole discretion, without notice, for conduct that we
          believe violates these Terms of Use.
        </p>
      </section>

      <!-- Call to Action Section -->
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Need assistance?</h1>
        <p class="mb-5">
          If you have any questions about these terms, please reach out to our
          support team.
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
