<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Other Policies</h1>
      </header>

      <!-- Community Guidelines Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Community Guidelines</h2>
        <p class="mb-2">
          Our Community Guidelines foster a respectful and inclusive
          environment. Users must adhere to these rules to ensure a positive
          experience for everyone.
        </p>
      </section>

      <!-- Cookie Policy Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Cookie Policy</h2>
        <p>
          We use cookies to enhance your browsing experience, analyze site
          usage, and personalize content. By using our platform, you consent to
          our use of cookies in accordance with this policy.
        </p>
      </section>

      <!-- Refund Policy Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Refund Policy</h2>
        <p>
          While YHT Reviews is a free platform, any premium services or
          donations may have specific refund terms. Please refer to the relevant
          service agreements for detailed information.
        </p>
      </section>

      <!-- Data Retention Policy Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Data Retention Policy</h2>
        <p>
          We retain user data for as long as necessary to provide our services,
          comply with legal obligations, resolve disputes, and enforce our
          agreements. You can request the deletion of your data at any time.
        </p>
      </section>

      <!-- Call to Action Section -->
      <section class="mb-5">
        <h1 class="text-xl font-semibold">Need assistance?</h1>
        <p class="mb-5">
          If you have any questions about these policies, please reach out to
          our support team.
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
