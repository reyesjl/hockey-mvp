<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl">
      <!-- Header -->
      <header class="mb-5 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Release Notes</h1>
      </header>

      <!-- Current Release Section -->
      <section class="mb-5">
        <h2 class="text-xl font-semibold">Current Release</h2>
        <p class="mb-2">
          <strong>Version 1.0 - Beta</strong>
        </p>
        <p>
          Released on <strong>December 27, 2024</strong>, this initial beta
          release introduces the foundational features of the Hockey Tournament
          Review Platform. We are excited to launch this beta version and
          welcome your feedback to help us improve and expand the platform.
        </p>
      </section>

      <!-- Summary of Features Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Summary of Features</h2>
        <ul class="list-disc list-inside">
          <li>User Accounts</li>
          <li>Tournaments</li>
          <li>Reviews</li>
          <li>Ratings</li>
          <li>Approval Process</li>
          <li>Flagging System</li>
          <li>Accessibility and Responsiveness</li>
        </ul>
      </section>

      <!-- Detailed Features Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-6">Detailed Features</h2>

        <!-- Feature 1: User Accounts -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">1. User Accounts</h3>
          <p class="mb-4">
            Users can sign up and log in to contribute to our website. Once
            registered, users have the ability to submit tournaments that are
            not yet available on the listings page. This feature ensures that
            our platform remains up-to-date with the latest tournaments and
            provides a personalized experience for each user.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li class="mb-2">
              Secure sign-up and login processes to protect user data.
            </li>
            <li class="mb-2">
              User authentication ensures that each user can manage their
              submissions and contributions effectively.
            </li>
            <li class="mb-2">
              Profile management allows users to update their information and
              track their submitted tournaments.
            </li>
          </ul>
        </div>

        <!-- Feature 2: Tournaments -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">2. Tournaments</h3>
          <p class="mb-4">
            Tournament listings are available for browsing, allowing users to
            search and filter tournaments by name and location using the search
            bar. Users can select a tournament to view its detailed information,
            which includes various data points to help them make informed
            decisions.
          </p>
          <ul class="list-disc list-inside ml-5 mb-4">
            <li>Name and Location (City, State)</li>
            <li>Dates Tournament is active/on-going</li>
            <li>Contact Email for Tournament Director, etc</li>
            <li>Notes and Company Information</li>
            <li>Ratings and Reviews</li>
            <li>Additional Features like Discounts and Special Offers</li>
          </ul>
        </div>

        <!-- Feature 3: Reviews -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">3. Reviews</h3>
          <p class="mb-4">
            Users can submit reviews for tournaments they have attended. Each
            review includes a title, a detailed body, and optional parking
            notes. Users are limited to one review per tournament to maintain
            the integrity and quality of feedback.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li>Title and Body</li>
            <li>Optional Parking Notes</li>
          </ul>
        </div>

        <!-- Feature 4: Ratings -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">4. Ratings</h3>
          <p class="mb-4">
            Ratings are divided into three categories: Overall, Communication,
            and Referee. Users can submit a rating for any, all, or none of
            these categories at any time. However, each user can only submit a
            single rating of each type per tournament to ensure unbiased and
            accurate feedback.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li>Overall Rating</li>
            <li>Communication Rating</li>
            <li>Referee Rating</li>
          </ul>
        </div>

        <!-- Feature 5: Approval Process -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">5. Approval Process</h3>
          <p class="mb-4">
            All tournament submissions enter a pending state upon submission.
            Admins review these submissions weekly to approve or deny them.
            Approved tournaments become publicly available on the site, ensuring
            that only accurate and verified information is displayed. This
            process helps prevent spam and maintains the quality of our
            listings.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li>Submissions are reviewed weekly by admins.</li>
            <li>Approved tournaments are listed publicly.</li>
            <li>
              Denied submissions remain in a pending state with feedback
              provided to the user.
            </li>
          </ul>
        </div>

        <!-- Feature 6: Flagging System -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">6. Flagging System</h3>
          <p class="mb-4">
            Users can flag tournaments for various reasons, such as inaccurate
            information or inappropriate content. When a tournament is flagged,
            admins review the request to verify its accuracy and take necessary
            actions, such as updating the tournament details or removing it from
            the listings.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li>
              Users can flag a tournament and provide a reason for the flag.
            </li>
            <li>Admins review flagged tournaments to verify issues.</li>
            <li>
              Based on the review, admins can update or remove the tournament as
              necessary.
            </li>
          </ul>
        </div>

        <!-- Feature 7: Accessibility and Responsiveness -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            7. Accessibility and Responsiveness
          </h3>
          <p class="mb-4">
            Our platform is designed to be fully mobile responsive, ensuring a
            seamless experience across various devices, including smartphones,
            tablets, and desktops. Additionally, we prioritize accessibility by
            adhering to HTML5 ARIA labels and accessibility standards, making
            our platform usable for individuals utilizing screen readers and
            other assistive technologies.
          </p>
          <ul class="list-disc list-inside ml-5">
            <li>Optimized layout for different screen sizes.</li>
            <li>Accessible navigation and interactive elements.</li>
            <li>Compliance with web accessibility guidelines.</li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/lib/ui/BaseButton.vue'
</script>

<style scoped></style>
