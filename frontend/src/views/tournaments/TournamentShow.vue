<!-- 
    Youth Hockey Tournaments

    Author: Jose Reyes
    Date: Dec 27, 2025

    Copyright © 2025 Jose Reyes. All rights reserved.

    This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
    in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.

    This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
    Any unauthorized use may result in legal action.

    For inquiries regarding licensing or permissions, please contact Jose Reyes.
-->
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { axiosInstance } from "@/config/apiConfig";
import type { Tournament, Review, User } from "@/types";
import { getGenderIcon } from "@/utils/tournaments";
import { useRoute, useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";

// State variables
const tournament = ref<Tournament | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const showModal = ref<boolean>(false);
const showDetails = ref<boolean>(false);
const submittedByUser = ref<User | null>(null);

// Reviews state
const reviews = ref<Review[]>([]);
const reviewsLoading = ref<boolean>(true);
const reviewsError = ref<string | null>(null);

const { user } = useAuth();
const isAdmin = computed(() => user.value?.roles.includes('admin'));

// Compute Ratings
const ratings = computed(() => [
  { label: "Comms", icon: "fa-bullhorn", value: tournament.value?.ratings.communication },
  { label: "Facilities", icon: "fa-building", value: tournament.value?.ratings.facilities },
  { label: "Referee", icon: "fa-user-check", value: tournament.value?.ratings.referee },
]);

// Compute Features
const features = computed(() => [
  { label: "Stay & Play", icon: "fa-hotel", active: tournament.value?.details.stay_and_play, description: "Whether a tournament company requires that you stay at their hotels during the entire tournament event." },
  { label: "Ext. Checkout", icon: "fa-clock", active: tournament.value?.details.extended_checkout, description: "Whether they allow you to checkout later than the end time of the tournament. Some families wish to stay a little later." },
  { label: "USA Hockey", icon: "fa-flag-usa", active: tournament.value?.details.usa_sanctioned, description: "Whether it is a USA Hockey sanctioned tournament." },
  { label: "Multi-Team Disc.", icon: "fa-money-bill-wave", active: tournament.value?.discounts.multi_team, description: "If they offer multi-team discounts for teams that register multiple teams, sometimes at various age groups, or more than one team if they do both boys and girls, etc." },
  { label: "Early-Bird Disc.", icon: "fa-dove", active: !!tournament.value?.discounts.early_bird, description: "If they offer early bird discounts for teams that register early." },
  { label: "First Place Hardware", icon: "fa-trophy", active: !!tournament.value?.hardware?.first_place, description: "If they give first place hardware or not." },
  { label: "Second Place Hardware", icon: "fa-medal", active: !!tournament.value?.hardware?.second_place, description: "If they give second place hardware or not." },
]);

// Fetch tournaments on mount
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/tournaments/${route.params.id}`);
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    tournament.value = data;
    await fetchReviews(route.params.id as string);
    await fetchSubmittedByUser(data.submitted_by);
  } catch (err) {
    error.value = "Error loading tournaments.";
  } finally {
    loading.value = false;
  }
});

// Method to fetch user details
const fetchSubmittedByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    submittedByUser.value = data;
  } catch (err) {
    console.error("Error fetching user details:", err);
  }
};

// Method to toggle details visibility
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

// Method to format dates
interface FormattedDate {
  day: string;
  month: string;
}

// Format date object
const formatDate = (date: Date): FormattedDate => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const [day, month] = formattedDate.split(' ');
  return { day, month };
};

// Fetch reviews
const fetchReviews = async (tournamentId: string) => {
  reviewsLoading.value = true;
  try {
    const response = await axiosInstance.get(`/reviews/tournament/${tournamentId}`);
    const { success, message, data } = response.data;
    if (!success) throw new Error(message);
    reviews.value = data;
  } catch (err) {
    reviewsError.value = "Error loading reviews.";
  } finally {
    reviewsLoading.value = false;
  }
}
</script>

<template>
  <main class="pt-[3.125rem]">
    <div class="container max-w-4xl">
      <!-- Loading State -->
      <div v-if="loading" class="text-gray-500">Loading tournament...</div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <!-- Display tournament -->
      <div v-else-if="tournament">

        <!-- Visibility -->
        <div class="flex gap-2 mt-4 items-center justify-end">
          <div v-if="tournament.visible.state == 'pending'"
            class="bg-yellow-500 text-white px-2 w-fit rounded-full shadow-md">Pending Approval</div>
          <div v-if="tournament.visible.state == 'rejected'"
            class="bg-red-500 text-white px-2 w-fit rounded-full shadow-md">Rejected</div>
          <RouterLink v-if="isAdmin" :to="{ name: 'tournament-update', params: { id: tournament._id } }">
            <div class="hover:bg-gray-700 bg-gray-500 text-white px-2 w-fit rounded-full shadow-md">Update <i
                class="text-xs fa-solid fa-pencil"></i></div>
          </RouterLink>
        </div>

        <!-- Location and rating-->
        <div class="mt-4 pb-2 flex justify-between items-center font-semibold">
          <div><i class="fa-solid fa-location-dot"></i> {{ tournament.location.city }}, {{
            tournament.location.state }}</div>
          <div>{{ tournament.ratings.overall }} <i class="fa fa-star" aria-hidden="true"></i></div>
        </div>

        <div class="bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg p-2">
          <h2 class="text-3xl font-semibold">{{ tournament.name }}</h2>

          <!-- Age Groups Icons -->
          <div class="mt-1 text-sm">Age Groups</div>
          <div class="flex flex-wrap">
            <div v-for="ageGroup in tournament.age_groups" :key="ageGroup"
              class="w-fit bg-black text-xs text-white flex items-center gap-1 rounded-full py-1 px-2 mr-2 mb-2">
              <i class="fa-solid fa-child"></i> {{ ageGroup }}
            </div>
          </div>

          <!-- Levels of Play Icons -->
          <div class="mt-1 text-sm">Levels of Play</div>
          <div class="flex flex-wrap">
            <div v-for="level in tournament.level_of_play" :key="level"
              class="w-fit bg-black text-xs text-white flex items-center gap-1 rounded-full py-1 px-2 mr-2 mb-2">
              <i class="fa-solid fa-hockey-puck"></i> {{ level }}
            </div>
          </div>

          <!-- Genders -->
          <div class="mt-1 text-sm">Genders</div>
          <div class="w-fit bg-black text-xs text-white flex items-center rounded-full py-1 px-2"
            v-html="getGenderIcon(tournament.gender)"></div>
        </div>

        <div class="text-sm italic text-gray-500 mt-2">Submitted by: @{{ submittedByUser?.username }}</div>

        <!-- Tournament Features (Icons Grid) -->
        <div class="font-semibold mt-4  flex items-center gap-1">
          <div>Features</div>
          <i class="fa-solid fa-question-circle text-sky-500 cursor-pointer" @click="showModal = true"></i>
        </div>
        <div class="mb-2 text-sm text-gray-600 italic">These icons give a quick overview—blue means available, gray
          means not.</div>

        <!-- Features Grid -->
        <div
          class="flex overflow-x-auto space-x-4 md:space-x-0 md:px-0 px-2 pb-2 md:grid md:grid-cols-4 md:gap-4 text-center">
          <div v-for="feature in features" :key="feature.label"
            class="flex flex-col items-center shadow-md rounded-xl min-w-[120px] pb-1">
            <i :class="['fa-solid', feature.icon, 'text-xl', feature.active ? 'text-sky-500' : 'text-gray-400']"></i>
            <span class="text-sm font-medium mt-1">{{ feature.label }}</span>
          </div>
        </div>

        <!-- Tournament description -->
        <div class="mt-4">
          <h3 class="font-semibold">Description</h3>
          <p v-if="tournament.description">{{ tournament.description }}</p>
          <p v-else class="text-gray-600 italic text-sm">No description has been provided by owners yet.
            Contact us if you are the owner.</p>
        </div>

        <!-- Notes / More Detail -->
        <div class="mt-4">
          <div class="font-semibold mt-4  flex items-center gap-1">
            <h3 class="font-semibold">Details</h3>
            <span class="text-xs text-sky-500 cursor-pointer" @click="toggleDetails">[{{ showDetails ? 'hide' : 'show'
            }}]</span>
          </div>
          <p class="text-sm text-gray-600 italic">Discounts and hardware notes can be found here if they exist.</p>
          <ul v-if="showDetails" class="list-disc list-inside">
            <li>
              First Place Hardware:
              <span v-if="tournament.hardware?.first_place">{{ tournament.hardware.first_place }}</span>
              <span v-else class="text-gray-600 text-sm italic">Unknown for this tournament.</span>
            </li>
            <li>
              Second Place Hardware:
              <span v-if="tournament.hardware?.second_place">{{ tournament.hardware.second_place }}</span>
              <span v-else class="text-gray-600 text-sm italic">Unknown for this tournament.</span>
            </li>
            <li>
              Early-Bird Discounts:
              <span v-if="tournament.discounts?.early_bird">{{ tournament.discounts.early_bird }}</span>
              <span v-else class="text-gray-600 text-sm italic">Unknown for this tournament.</span>
            </li>
            <li>
              Multi-Team Discounts:
              <span v-if="tournament.discounts?.multi_team">{{ tournament.discounts.multi_team }}</span>
              <span v-else class="text-gray-600 text-sm italic">Unknown for this tournament.</span>
            </li>
          </ul>
        </div>

        <!-- Dates -->
        <div class="mt-4">
          <h3 class="font-semibold">Dates</h3>
          <p class="text-sm text-gray-600 italic">Here are some upcoming events—register on their official site.</p>

          <div class="flex overflow-x-auto space-x-2 md:px-0 px-2 pb-2 text-center mt-2">
            <div v-if="tournament.dates.length === 0"
              class="flex flex-col items-center bg-gray-500 text-white rounded-lg w-fit p-2">
              <span class="text-xl font-semibold">0</span>
              <span class="text-sm">NONE</span>
            </div>
            <div v-else v-for="date in tournament.dates"
              class="flex flex-col items-center bg-black text-white rounded-lg w-fit p-2">
              <span class="text-xl font-semibold">{{ formatDate(date).day }}</span>
              <span class="text-sm">{{ formatDate(date).month }}</span>
            </div>
          </div>
        </div>

        <!-- Tournament Ratings -->
        <div class="mt-4">
          <h3 class="font-semibold">Ratings</h3>
          <div class="mb-2 text-sm text-gray-600 italic">This section displays ratings for the tournament's director of
            communication, facility
            quality, and referee performance in the tournament.</div>
          <div class="flex justify-evenly items-center">
            <div v-for="rating in ratings" :key="rating.label"
              class="flex flex-col items-center gap-2 p-2 shadow-md rounded-lg border border-gray-200">
              <div class="text-xl font-semibold">{{ rating.value }}</div>
              <div><i :class="['fa-solid', rating.icon, 'text-xs']"></i> {{ rating.label }}</div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <hr class="mt-5">
        <div class="mb-20">

          <div class="mt-2 flex gap-2 items-center justify-between md:justify-normal mb-4">
            <h2 class="text-xl font-bold">{{ reviews.length }} Reviews</h2>
            <RouterLink
              class="text-white bg-black hover:bg-gray-400 hover:shadow-none duration-200 rounded-full shadow-lg p-1 px-2"
              :to="{ name: 'review-create', params: { tournamentId: tournament._id } }">
              Create
            </RouterLink>
          </div>


          <!-- Loading reviews-->
          <div v-if="reviewsLoading" class="text-gray-500">Loading reviews...</div>

          <!-- Error state -->
          <div v-else-if="reviewsError" class="text-red-500">{{ reviewsError }}</div>

          <!-- Display reviews -->
          <div v-else>
            <div v-for="review in reviews" :key="review._id"
              class="border border-solid border-gray-200 rounded-lg w-fit py-1 px-2 flex flex-col mt-2 hover:bg-gray-200 shadow-md duration-200">
              <div class="flex justify-between items-center text-sm">
                <div class="font-semibold text-sm">{{ review.subject }}</div>
                <div>{{ review.ratings.overall }} <i class="fa fa-star" aria-hidden="true"></i></div>
              </div>
              <div class="text-sm text-gray-500 italic">@{{ review.reviewer.username }}</div>
              <div class="text-sm">{{ review.comment }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div class="p-4 border-b">
          <h3 class="text-lg font-semibold">Features Explained</h3>
        </div>
        <div class="p-4 overflow-y-auto max-h-96">
          <p class="italic text-sm text-red-800">These icons give a quick overview—blue means available, gray means not.
            Scroll to 'details' for more.</p>
          <ul class="mt-4">
            <li v-for="feature in features" :key="feature.label" class="mb-2">
              <strong>{{ feature.label }}:</strong> {{ feature.description }}
            </li>
          </ul>
        </div>
        <div class="p-4 border-t flex justify-end">
          <button @click="showModal = false" class="bg-black text-white px-4 py-2 rounded-full">Close</button>
        </div>
      </div>
    </div>
  </main>
</template>