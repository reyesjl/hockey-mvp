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

// Get router object
const router = useRouter()

// Get the current user from the composable
const { user } = useAuth()

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
</script>

<template>
    <main class="pt-[3.125rem]">
        <div class="mt-10 md:mt-16">
            <div class="container mb-20">

                <div class="flex justify-between mb-5 items-center">
                    <div>
                        <h1 class="text-3xl font-semibold">Dashboard</h1>
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

                <!-- Update avatar / Reset Avatar -->
                <div class="flex justify-center mt-2">
                    <BaseButton size="sm" iconRight="fa-solid fa-user" label="Change Avatar" class="shadow-xl text-sm mr-2" />
                    <BaseButton @click="handleResetAvatar" size="sm" iconRight="fa-solid fa-rotate-left" label="Reset Avatar" class="shadow-xl text-sm bg-red-500 mr-2" />
                </div>
            </div>
        </div>
    </main>
</template>
