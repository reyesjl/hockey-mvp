<script setup lang="ts"></script>

<template>
  <main class="container mx-auto py-10">
    <!-- Community Overview Section -->
    <section class="mb-8">
      <h1 class="text-4xl font-extrabold text-white mb-4">Community Driven</h1>
      <p class="text-xl text-gray-400 mb-6">
        The <strong>Hockey Tournament Review Platform</strong> is entirely
        user-driven. Our platform empowers players, coaches, and fans to share
        their experiences, submit tournaments, leave reviews, and help improve
        the quality of events in the hockey community. This is your space to
        provide valuable insights and help others make informed decisions about
        tournaments.
      </p>
    </section>

    <!-- Tournament Submission Section -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Tournament Submission
      </h2>
      <p class="text-lg text-gray-500">
        Users can submit tournaments to the platform for review. This is a
        simple process where tournament organizers or community members can
        provide essential details such as location, date, and event specifics.
        Once submitted, the tournament goes through an approval process to
        ensure the accuracy and quality of the event information before being
        published.
      </p>
    </section>

    <!-- Flagging System Section -->
    <section class="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Flagging System</h2>
      <p class="text-lg text-gray-500">
        The flagging system allows users to report issues with tournament
        details, such as incorrect information or outdated events. If something
        appears wrong or needs an update, users can flag it, which alerts the
        admin team to review the issue. Flagging ensures that the platform
        maintains high-quality, accurate content for the community.
      </p>
    </section>

    <!-- Review System Section -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Review System</h2>
      <p class="text-lg text-gray-500">
        Users can leave reviews for tournaments, providing feedback on the
        event's organization, location, facilities, and overall experience.
        These reviews help other players, coaches, and fans make informed
        decisions. Reviews go through an approval process to ensure they meet
        community standards and reflect honest experiences.
      </p>
    </section>

    <!-- Approval Process Section -->
    <section class="bg-gray-50 p-6 rounded-lg shadow-lg mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        Approval Process
      </h2>
      <p class="text-lg text-gray-500">
        Our approval process ensures that every tournament submission, flagged
        issue, and review meets the platform's standards. Here's how it works:
      </p>

      <!-- Tournament Submission Approval -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Tournament Submission
        </h3>
        <p class="text-lg text-gray-500">
          When a user submits a tournament, it goes to our admin team for
          review. The admins check the tournament details for accuracy and
          appropriateness. Once approved, the tournament will be listed on the
          platform for others to see and review.
        </p>
      </div>

      <!-- Flagging Approval Process -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Flagging System Review
        </h3>
        <p class="text-lg text-gray-500">
          If a tournament is flagged, an admin will review the flagged content
          and verify the issue. If the tournament's information is found to be
          incorrect or outdated, the admin will either update the event details
          or remove the listing as needed.
        </p>
      </div>

      <!-- Review Approval Process -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Review Approval
        </h3>
        <p class="text-lg text-gray-500">
          All reviews are submitted for approval before being published. The
          admin ensures that reviews follow platform guidelines and that they
          provide value to the community. Once approved, reviews are visible to
          other users, helping them make informed decisions.
        </p>
      </div>
    </section>

    <!-- Community Call to Action -->
    <section class="mt-8 text-center">
      <h2 class="text-2xl font-semibold text-white mb-4">Join the Community</h2>
      <p class="text-lg text-gray-400 mb-6">
        Your feedback, submissions, and reviews are what make this platform
        thrive. Be a part of our community-driven initiative and help us provide
        valuable insights for the hockey world.
      </p>
      <RouterLink
        to="/tournaments"
        class="bg-sky-700 px-5 py-2 rounded-full hover:bg-sky-500 duration-200"
      >
        Submit a Tournament or Leave a Review
      </RouterLink>
    </section>
  </main>
</template>

<style scoped></style>
