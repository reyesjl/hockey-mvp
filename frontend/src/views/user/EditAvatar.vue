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
import useAuth from '@/composables/useAuth'
import Avatar from '@/lib/ui/Avatar.vue'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { saveUserAvatar } from '@/services/userService'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { user } = useAuth()
const router = useRouter();

const avatars = [
    'teams_v1/Anaheim_Ducks.webp', 'teams_v1/Arizona_Coyotes.webp', 'teams_v1/Boston_Bruins.webp', 'teams_v1/Buffalo_Sabres.webp',
    'teams_v1/Calgary_Flames.webp', 'teams_v1/Carolina_Hurricanes.webp', 'teams_v1/Chicago_Blackhawks.webp', 'teams_v1/Colorado_Avalanche.webp',
    'teams_v1/Columbus_Blue_Jackets.webp', 'teams_v1/Dallas_Stars.webp', 'teams_v1/Detroit_Red_Wings.webp', 'teams_v1/Edmonton_Oilers.webp',
    'teams_v1/Florida_Panthers.webp', 'teams_v1/Los_Angeles_Kings.webp', 'teams_v1/Minnesota_Wild.webp', 'teams_v1/Montreal_Canadiens.webp',
    'teams_v1/Nashville_Predators.webp', 'teams_v1/New_Jersey_Devils.webp', 'teams_v1/New_York_Islanders.webp', 'teams_v1/New_York_Rangers.webp',
    'teams_v1/Ottawa_Senators.webp', 'teams_v1/Philadelphia_Flyers.webp', 'teams_v1/Pittsburgh_Penguins.webp', 'teams_v1/San_Jose_Sharks.webp',
    'teams_v1/Seattle_Kraken.webp', 'teams_v1/St._Louis_Blues.webp', 'teams_v1/Tampa_Bay_Lightning.webp', 'teams_v1/Toronto_Maple_Leafs.webp',
    'teams_v1/Vancouver_Canucks.webp', 'teams_v1/Vegas_Golden_Knights.webp', 'teams_v1/Washington_Capitals.webp', 'teams_v1/Winnipeg_Jets.webp'
]

const selectedAvatar = ref(user.value?.avatar || '')

const selectAvatar = (avatar: string) => {
    selectedAvatar.value = avatar
}

const isAvatarChanged = computed(() => selectedAvatar.value !== user.value?.avatar)

const handleSaveAvatar = async () => {
    try {
        if (user.value?.uuid && selectedAvatar.value) {
            await saveUserAvatar(user.value?.uuid, selectedAvatar.value)
        }
    } catch (error) {
        console.error('Error saving avatar:', error)
    }
}
</script>

<template>
    <main class="pt-[3.125rem]">
        <div class="mt-10 md:mt-16">
            <div class="container mb-20 max-w-4xl">
                <!-- Back Button -->
                <div class="mb-5">
                    <button @click="router.back()" class="text-sm text-blue-500 hover:underline">
                        &larr; Back
                    </button>
                </div>
                <div class="flex justify-center mb-5">
                    <Avatar :path="selectedAvatar" alt="User Avatar" size="medium"
                        class="border-2 border-solid border-sky-500" />
                </div>
                <div class="flex justify-center mb-8">
                    <BaseButton @click="handleSaveAvatar" label="Save Avatar" :disabled="!isAvatarChanged" />
                </div>
                <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
                    <div v-for="avatar in avatars" :key="avatar" class="cursor-pointer flex justify-center" @click="selectAvatar(avatar)">
                        <img :src="`/assets/avatars/${avatar}`" :alt="avatar"
                            :class="{ 'opacity-50': selectedAvatar !== avatar, 'opacity-100': selectedAvatar === avatar }"
                            class="shadow-xl h-[100px] w-[100px] rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>