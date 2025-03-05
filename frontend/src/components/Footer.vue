<template lang="html">
  <footer
    class="pt-20 pb-10 border-t-[1px] border-[#0000002c] transition-all duration-300"
  >
    <div class="container">
      <div class="flex flex-col md:flex-row gap-5 md:gap-10">
        <div class="text-xs">
          <div class="text-gray-500 mb-2">Company</div>
          <ul class="list-none gap-3 flex flex-col">
            <li>
              <RouterLink :to="{ name: 'about' }" class="text-black"
                >About Us</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'community' }" class="text-black"
                >Community</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'support' }" class="text-black"
                >Support</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="text-xs">
          <div class="text-gray-500 mb-2">Our content</div>
          <ul class="list-none gap-3 flex flex-col">
            <li>
              <RouterLink :to="{ name: 'tournaments' }" class="text-black"
                >Tournaments</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'upcomingReleases' }" class="text-black"
                >Amenities</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="text-xs">
          <div class="text-gray-500 mb-2">Latest features</div>
          <ul class="list-none gap-3 flex flex-col">
            <li>
              <RouterLink :to="{ name: 'releaseNotes' }" class="text-black"
                >Current release</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'upcomingReleases' }" class="text-black"
                >What's up next?</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="text-xs">
          <div class="text-gray-500 mb-2">Terms & policies</div>
          <ul class="list-none gap-3 flex flex-col">
            <li>
              <RouterLink :to="{ name: 'termsOfUse' }" class="text-black"
                >Terms of use</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'privacyPolicy' }" class="text-black"
                >Privacy policy</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'brandGuidelines' }" class="text-black"
                >Brand guidelines</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'otherPolicies' }" class="text-black"
                >Other policies</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-5 text-xs text-gray-400">YHT Reviews 2025</div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
<style lang="ts"></style>
