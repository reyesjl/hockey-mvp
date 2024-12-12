<script setup lang="ts"></script>

<template>
  <main class="container mx-auto py-10">
    <!-- Support Overview Section -->
    <section class="mb-8">
      <h1 class="text-4xl font-extrabold text-white mb-4">
        Support the Platform
      </h1>
      <p class="text-xl text-gray-400 mb-6">
        The <strong>Hockey Tournament Review Platform</strong> is a
        community-driven project, not backed by big hockey companies. We’re
        funded entirely by individuals who care about making the hockey
        tournament experience better for everyone. Your support helps keep this
        platform alive and running!
      </p>
    </section>

    <!-- How You Can Help Section -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        How You Can Help
      </h2>
      <p class="text-lg text-gray-500">
        Donations from the community help us cover hosting costs, enhance
        features, and keep tournament information up-to-date. Every
        contribution, big or small, makes a difference.
      </p>
    </section>

    <!-- Why It Matters Section -->
    <section class="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Why Your Support Matters
      </h2>
      <p class="text-lg text-gray-500">
        By supporting this platform, you’re helping to ensure players, coaches,
        and fans have access to reliable tournament reviews and information,
        making their decisions easier and the hockey community stronger.
      </p>
    </section>

    <!-- Call to Action Section -->
    <section class="mt-8 text-center">
      <h2 class="text-2xl font-semibold text-white mb-4">
        Join Us in Making a Difference
      </h2>
      <p class="text-lg text-gray-400 mb-6">
        Your generosity helps us keep the platform free and accessible for
        everyone. Together, we can improve the hockey tournament experience for
        the whole community.
      </p>
      <RouterLink
        to="/"
        class="bg-sky-700 px-5 py-2 rounded-full hover:bg-sky-500 duration-200"
      >
        Donate Today
      </RouterLink>
    </section>
  </main>
</template>

<style scoped></style>
