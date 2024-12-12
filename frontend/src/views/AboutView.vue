<script setup lang="ts"></script>

<template>
  <main class="container mx-auto py-10">
    <!-- About Section -->
    <section class="mb-8">
      <h1 class="text-4xl font-extrabold text-white mb-4">About Us</h1>
      <p class="text-xl text-gray-400 mb-6">
        Welcome to the <strong>Hockey Tournament Review Platform</strong>! We
        are a group of hockey enthusiasts and developers who, after seeing the
        challenges in finding quality and reliable hockey tournaments, decided
        to build this platform. We are not affiliated with any big hockey
        companies or organizations. This is a public project, created with
        passion and funded entirely by us, with the goal of helping the hockey
        community.
      </p>
      <p class="text-xl text-gray-400 mb-6">
        The Hockey Tournament Review Platform is built for the community. We
        believe that players, coaches, and fans should have access to valuable
        insights when it comes to choosing the best tournaments to attend. By
        offering a space for tournament submissions and reviews, we provide
        transparency, help improve the quality of events, and give everyone a
        voice in the hockey world.
      </p>
    </section>

    <!-- Purpose and Mission Section -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Our Purpose</h2>
      <p class="text-lg text-gray-500">
        Our goal is to make it easier for players and coaches to find
        tournaments that meet their needs. With so many events out there, it can
        be overwhelming to decide which ones are worth your time and investment.
        Our platform allows users to review tournaments, provide ratings, and
        share their experiences so others can make informed decisions.
      </p>
    </section>

    <!-- Benefit to Users Section -->
    <section class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Why This Platform Matters
      </h2>
      <p class="text-lg text-gray-500">
        We understand the frustration of finding good tournaments, especially
        when information is scarce or unreliable. Our platform brings
        transparency and community-driven feedback to the forefront, allowing
        players, coaches, and fans to see which tournaments are truly worth
        attending. By aggregating reviews, tournament details, and nearby
        amenities like hotels and rinks, we aim to make your decision-making
        process much easier.
      </p>
    </section>

    <!-- Community Call Section -->
    <section class="mt-8 text-center">
      <h2 class="text-2xl font-semibold text-white mb-4">Join the Community</h2>
      <p class="text-lg text-gray-400 mb-6">
        This project is built with love by people who care about the hockey
        community. Your feedback and involvement are what keep this platform
        thriving. Whether you’re submitting a new tournament, writing a review,
        or simply browsing, your participation helps improve the experience for
        everyone.
      </p>
      <RouterLink
        to="/tournaments"
        class="bg-sky-700 px-5 py-2 rounded-full hover:bg-sky-500 duration-200"
      >
        Submit Tournament or Leave a Review</RouterLink
      >
    </section>
  </main>
</template>

<style scoped></style>
