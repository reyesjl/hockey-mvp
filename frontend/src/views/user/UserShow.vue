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
import { computed, onMounted, ref } from 'vue';
import type { Tournament, User, Review } from '@/types';
import Avatar from '@/lib/ui/Avatar.vue'
import { axiosInstance } from '@/config/apiConfig';
import { getGenderIcon } from "@/utils/tournaments";
import { useRoute, useRouter } from 'vue-router';

const user = ref<User | null>(null);
const tournaments = ref<Tournament[]>([]);
const reviews = ref<Review[]>([]);

const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const route = useRoute();
const router = useRouter();

// Fetch profile data
const fetchProfileData = async () => {
    try {
        const response = await axiosInstance.get(`/users/username/${route.params.username}`);
        const data = response.data.data;
        user.value = data.user;
        tournaments.value = data.tournaments;
        reviews.value = data.reviews;
        loading.value = false;
    } catch (err) {
        error.value = "Error fetching profile data";
        console.error("Error fetching profile data:", err as any);
    }
}

// Compute the number of days the user has been a member
const memberForDays = computed(() => {
  if (!user.value?.createdAt) return null;
  const createdAt = new Date(user.value.createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
});

onMounted(async () => {
    await fetchProfileData();
}); 

</script>

<template>
  <main class="pt-[3.125rem]">
        <div class="mt-10 md:mt-16">
            <div class="container mb-20">

            <!-- Back Button -->
            <div class="mb-5">
                <button @click="router.back()" class="text-sm text-blue-500 hover:underline">
                    &larr; Back
                </button>
            </div>

            <div class="mb-5">
                <!-- User avatar -->
                <div class="flex justify-center mb-3">
                    <Avatar :path="user?.avatar || ''" alt="User Avatar" size="large" />
                </div>

                <!-- Username -->
                <div class="text-center">
                    <div class="text-lg font-semibold">@{{ user?.username }}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Member for {{ memberForDays }} days</div>
                </div>
            </div>

            <div class="mb-2">
                <h1 class="text-2xl">User Tournaments</h1>
                <p class="text-sm text-gray-500 italic">These are tournaments the user has submitted to the site.</p>
            </div>
            <!-- Loading State -->
            <div v-if="loading" class="text-gray-500">Loading tournaments...</div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-500">{{ error }}</div>

            <!-- Display Tournaments -->
            <ul v-else-if="tournaments.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <li v-for="tournament in tournaments" :key="tournament._id" class="group/item p-1 border border-gray-300 rounded-lg shadow-md duration-200">
                    <RouterLink :to="`/tournaments/${tournament._id}`">
                        <div class="duration-200 bg-gradient-to-b group-hover/item:text-white group-hover/item:from-sky-700 group-hover/item:to-sky-300 from-sky-300 to-sky-100 rounded-lg p-2">
                            <div class="font-semibold text-sm">{{ tournament.company.name }}</div>
                            <h2 class="text-xl">{{ tournament.name }}</h2>
                            <div class="w-fit bg-black text-xs text-white flex items-center rounded-full py-1 px-2 mt-2" v-html="getGenderIcon(tournament.gender)"></div>
                        </div>
                        <div class="flex justify-between items-center pt-2 text-sm font-semibold">
                            <div><i class="fa-solid fa-location-dot"></i> {{ tournament.location.city }}, {{ tournament.location.state }}</div>
                            <div>{{ tournament.ratings.overall }} <i class="fa fa-star" aria-hidden="true"></i></div>
                        </div>
                    </RouterLink>
                </li>
            </ul>

            <!-- Display reviews -->
            <div class="mb-2 mt-10">
                <h1 class="text-2xl">User Reviews</h1>
                <p class="text-sm text-gray-500 italic">These are some reviews the user has submitted to the site.</p>
            </div>
            <ul v-if="reviews?.length > 0" class="flex flex-col gap-2 md:max-w-[70%]">
                <li v-for="review in reviews" :key="review._id" class="group/item text-sm">
                    <div class="mb-1 font-semibold">{{ review.subject }}</div>
                    {{ review.comment }}
                </li>
            </ul>

            </div>
        </div>
    </main>
</template>