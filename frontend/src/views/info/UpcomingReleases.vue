<template>
  <main class="pt-[3.125rem]">
    <div class="container mx-auto max-w-4xl px-4">
      <!-- Header Section -->
      <header class="mb-8 mt-10 md:mt-16">
        <h1 class="text-4xl md:text-6xl font-semibold">Upcoming Releases</h1>
        <p class="mt-4 text-lg">
          We are continuously working to enhance the Hockey Tournament Review
          Platform. Here's a glimpse of what you can expect in our future
          updates.
        </p>
      </header>

      <!-- Summary of Upcoming Features -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">
          Summary of Upcoming Features
        </h2>
        <ul class="list-disc list-inside">
          <li>User Accounts Enhancements</li>
          <li>Contributors Recognition</li>
          <li>Amenities Integration</li>
          <li>Advanced Review Filtering</li>
          <li>Trip Planning</li>
        </ul>
      </section>

      <!-- Detailed Features Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-6">Detailed Features</h2>

        <!-- Feature 1: User Accounts Enhancements -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            1. Accounts Enhancements <Badge color="blue">Low Priority</Badge>
          </h3>
          <p class="mb-4">
            We plan to introduce a dedicated page where users can view their
            submissions and track the progress of their tournament submissions.
            Currently, users receive email notifications regarding the status of
            their submissions. This new feature will provide a centralized
            location for users to manage and monitor their contributions
            effectively.
          </p>
        </div>

        <!-- Feature 2: Contributors Recognition -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            2. Contributors Recognition <Badge color="blue">Low Priority</Badge>
          </h3>
          <p class="mb-4">
            To celebrate our maintainers and contributors, we aim to implement a
            feature that tracks user contributions throughout the lifetime of
            their accounts. A dedicated Contributors page will display the names
            of active contributors along with the number of contributions they
            have made, fostering a sense of community and appreciation.
          </p>
        </div>

        <!-- Feature 3: Amenities Integration -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            3. Amenities Integration <Badge color="red">High Priority</Badge>
          </h3>
          <p class="mb-4">
            For tournaments, we plan to add comprehensive amenities information
            to help users plan their trips more efficiently. Future updates will
            include details about nearby rinks, hotels, restaurants, and
            entertainment options, providing users with all the necessary
            information to enhance their tournament experience.
          </p>
        </div>

        <!-- Feature 4: Advanced Review Filtering -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            4. Review Filtering <Badge color="purple">Medium Priority</Badge>
          </h3>
          <p class="mb-4">
            Currently, users can paginate through reviews on their dedicated
            page. In upcoming updates, we will introduce advanced filtering
            options that allow users to sort reviews by attendance date and
            filter based on specific criteria, such as the presence of parking
            notes. This enhancement will make it easier for users to find
            relevant reviews that meet their specific needs.
          </p>
        </div>

        <!-- Feature 8: Trip Planning Feature -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">
            5. Trip Planning <Badge color="red">High Priority</Badge>
          </h3>
          <p class="mb-4">
            Allows users to create personalized trips within their accounts.
            Users can add tournaments and select a combination of amenities such
            as rinks, hotels, restaurants, and entertainment options. When
            viewing their trip details, users will see the total travel distance
            between selected places, calculated by our site to provide estimated
            travel times.
          </p>
          <ul class="list-disc list-inside">
            <li>Create and manage multiple trips within user accounts.</li>
            <li>
              Add tournaments and select from a variety of amenities to include
              in trips.
            </li>
            <li>
              View calculated travel distances and estimated travel times
              between selected locations.
            </li>
            <li>
              Share trips with other users through public links, allowing
              sharing of trip itineraries.
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Badge from '@/lib/ui/Badge.vue'
</script>

<style scoped>
/* Add any additional scoped styles here if necessary */
</style>
