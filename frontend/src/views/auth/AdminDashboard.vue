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
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'
import { logout } from '@/services/authService'
import BaseButton from '@/lib/ui/BaseButton.vue'
import Avatar from '@/lib/ui/Avatar.vue'
import { resetUserAvatar } from '@/services/userService'
import { ref, onMounted } from "vue";
import { axiosInstance } from "@/config/apiConfig";
import type { Tournament } from "@/types";
import { RouterLink } from 'vue-router';

// Get router object
const router = useRouter()

// Get the current user from the composable
const { user } = useAuth()

// State variables
const userTournaments = ref<Tournament[]>([]);
const loadingTournaments = ref<boolean>(true);
const errorTournaments = ref<string | null>(null);

function handleLogout() {
    logout()
    router.push({ name: 'login' });
}

async function handleResetAvatar() {
    const defaultAvatarPath = 'default_avatar.webp';
    if (user.value) {
        try {
            await resetUserAvatar(user.value.uuid, defaultAvatarPath);
        } catch {
            console.error('Error resetting user avatar');
        }
    }
}

// Fetch user tournaments on mount
onMounted(async () => {
    loadingTournaments.value = true;
    try {
        const response = await axiosInstance.get(`/tournaments`);
        const { success, message, data } = response.data;
        if (!success) throw new Error(message);
        userTournaments.value = data.tournaments;
    } catch (err) {
        errorTournaments.value = "Error loading user tournaments.";
    } finally {
        loadingTournaments.value = false;
    }
});

// Method to get color based on visible state
const getStatusColor = (state: string) => {
    switch (state) {
        case 'approved':
            return 'bg-green-500';
        case 'rejected':
            return 'bg-red-500';
        case 'pending':
        default:
            return 'bg-yellow-500';
    }
};

// Method to calculate days ago
const calculateDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
</script>

<template>
    <main class="pt-[3.125rem]">
        <div class="mt-10 md:mt-16">
            <div class="container mb-20">

                <div class="flex justify-between mb-5 items-center">
                    <div>
                        <h1 class="text-3xl font-semibold">Admin Dashboard</h1>
                    </div>
                    <div>
                        <BaseButton @click="handleLogout" iconRight="fa-solid fa-sign-out" size="sm" label="Logout" class="shadow-xl text-sm bg-gray-400" />
                    </div>
                </div>

                <!-- User avatar -->
                <div class="flex justify-center mb-3">
                    <Avatar :path="user?.avatar || ''" alt="User Avatar" size="large" />
                </div>

                <!-- Username -->
                <div class="text-center">
                    <div class="text-lg font-semibold">@{{ user?.username }}</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">{{ user?.email }}</div>
                </div>

                <!-- Update avatar / Reset Avatar -->
                <div class="flex justify-center mt-2">
                    <RouterLink :to="{ name: 'edit-avatar' }">
                        <BaseButton size="sm" iconRight="fa-solid fa-user" label="Change Avatar" class="shadow-xl text-sm mr-2" />
                    </RouterLink>
                    <BaseButton @click="handleResetAvatar" size="sm" iconRight="fa-solid fa-rotate-left" label="Reset Avatar" class="shadow-xl text-sm bg-red-500 mr-2" />
                </div>

                <!-- User Tournaments -->
                <div class="mt-10">
                    <h2 class="text-2xl font-semibold">All Tournaments</h2>
                    <p class="text-sm text-gray-500 italic mb-4"><span class="text-yellow-500">Yellow</span> means pending, <span class="text-green-500">green</span> means approved, and <span class="text-red-500">red</span> means rejected.</p>
                    <div v-if="loadingTournaments" class="text-gray-500">Loading tournaments...</div>
                    <div v-else-if="errorTournaments" class="text-red-500">{{ errorTournaments }}</div>
                    <ul v-else-if="userTournaments.length > 0" class="flex flex-wrap gap-4">
                        <li v-for="tournament in userTournaments" :key="tournament._id" class="md:w-[49%] w-full  shadow-md p-2 border rounded-lg">
                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-500">{{ tournament.createdAt ? calculateDaysAgo(tournament.createdAt) : 'N/A' }} days ago</div>
                                <span :class="`w-3 h-3 rounded-full ${getStatusColor(tournament.visible.state)}`"></span>
                            </div>
                            <RouterLink :to="{ name: 'tournament', params: { id: tournament._id } }">
                                <h3 class="font-semibold text-sky-500 hover:text-sky-700 underline">{{ tournament.name }}</h3>
                            </RouterLink>
                            <div v-if="tournament.visible.state == 'rejected'" class="text-sm text-gray-900">{{ tournament.visible.reason }}</div>
                        </li>
                    </ul>
                    <div v-else class="text-gray-500">Did not find any tournaments submitted by you. Visit this
                        <RouterLink :to="{ name: 'tournament-create'}" class="text-sky-500 underline">page</RouterLink> to submit one.</div>
                </div>

                <div class="mt-10">
                    <h2 class="text-2xl font-semibold">My Trips</h2>
                    <p class="text-gray-500">Learn more about future updates and upcoming features in our <a class="text-sky-500 underline" href="/info/upcoming-releases">release notes</a>.</p>
                    <ul class="list-disc ml-5 mt-2 text-gray-500">
                        <li>Will allow you to create, save, and share your trip with others.</li>
                        <li>Use AI help maximize your time, and let it create an itinerary for you.</li>
                        <li>Will calculate and display travel times between all rinks and restaurant, hotel, etc.</li>
                        <li>Ability to save a trip with multiple locations related to the tournament you will be attending.</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>
