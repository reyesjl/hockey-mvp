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
import { ref } from "vue";
import { axiosInstance } from "@/config/apiConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// State variables
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const user = ref<any>(null);

// Get current user's Firebase ID and fetch user from MongoDB
const auth = getAuth();
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    try {
      const response = await axiosInstance.get(`/users/${firebaseUser.uid}`);
      user.value = response.data.data;
    } catch (err) {
      error.value = "Error fetching user.";
    }
  } else {
    error.value = "User not authenticated.";
  }
});
</script>

<template>
    <main class="pt-[3.125rem]">
        <div class="container max-w-7xl">
            <div class="mt-10 md:mt-16">
                <h1 class="text-2xl font-bold mb-4">Create New Tournament</h1>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-gray-500">Loading...</div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-500">{{ error }}</div>

            <!-- Display Tournaments -->
            <div v-else>
                Insert form here...
            </div>
        </div>
    </main>
</template>