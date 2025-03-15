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
import * as yup from 'yup';
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useAuth from "@/composables/useAuth";
import BaseButton from "@/lib/ui/BaseButton.vue";
import { CustomError } from '@/utils/CustomError'
import { axiosInstance } from "@/config/apiConfig";
import { reviewSchema } from "@/utils/schemas/reviewSchema";

const { user } = useAuth();

// State variables
const tournamentId = ref<string>(useRoute().params.tournamentId as string);
const reviewer = ref({
    id: user.value?._id || null,
    username: user.value?.username || null
});
const ratings = ref<{ overall: number, referee: number, communication: number, facilities: number }>({
    overall: 1,
    referee: 5,
    communication: 5,
    facilities: 5
});
const subject = ref<string>("");
const comment = ref<string>("");

const success = ref<string | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null); // General error message
const errors = ref<{ [key: string]: string }>({})   // Form validation errors

const router = useRouter();

const createReview = async () => {
    loading.value = true;
    error.value = null;
    errors.value = {};

    const reviewData = {
        tournament: tournamentId.value,
        reviewer: {
            id: reviewer.value.id || null,
            username: reviewer.value.username || null
        },
        ratings: ratings.value,
        subject: subject.value,
        comment: comment.value,
    };

    try {
        await reviewSchema.validate(reviewData, { abortEarly: false });
        const response = await axiosInstance.post('/reviews', reviewData);
        const { success, message, data } = response.data;
        // Handle successful creation
        router.push({ name: 'tournament', params: { id: data.tournament } });
    } catch (err: any) {
        if (err instanceof yup.ValidationError) {
            err.inner.forEach((validationError: yup.ValidationError) => {
                if (validationError.path) {
                    errors.value[validationError.path] = validationError.message;
                }
            });
        } else if (err instanceof CustomError) {
            error.value = err.message;
        } else {
            console.log(err);
            if (err.response.data.errorCode == "DUPLICATE_KEY_ERROR") {
                error.value = "You have already submitted a review for this tournament.";
            }
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <main class="pt-[3.125rem]">
        <!-- Full background -->
        <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100">
            <!-- Invisible form wrapper -->
            <div class="container max-w-4xl">
                <div class="mt-10 md:mt-16 mb-5">
                    <div class="text-3xl text-black font-semibold">New Review</div>
                    <div class="text-sm text-gray-500">submitted by @{{ user?.username }}</div>
                </div>
                <!-- Review form -->
                <form @submit.prevent="createReview"
                    class="bg-gradient-to-b from-sky-200 to-sky-100 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <!-- Ratings -->
                    <div class="mb-4">
                        <label for="overall" class="block text-sm font-semibold text-gray-700">Overall Rating</label>
                        <p class="text-gray-500 text-sm">Overall how would you rate your tournament experience?</p>
                        <input v-model="ratings.overall" type="range" id="overall" name="overall" min="1" max="5" step="0.1"
                            class="mt-1 block w-full" />
                        <p class="text-sm mt-1 mb-1">{{ ratings.overall }}</p>
                        <p v-if="errors['ratings.overall']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['ratings.overall'] }}</p>
                    </div>
                    <div class="mb-4">
                        <label for="referee" class="block text-sm font-semibold text-gray-700">Referee Rating</label>
                        <p class="text-gray-500 text-sm">How would you rate the referee quality?</p>
                        <input v-model="ratings.referee" type="range" id="referee" name="referee" min="1" max="5" step="0.1"
                            class="mt-1 block w-full" />
                        <p class="text-sm mt-1 mb-1">{{ ratings.referee }}</p>
                        <p v-if="errors['ratings.referee']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['ratings.referee'] }}</p>
                    </div>
                    <div class="mb-4">
                        <label for="communication" class="block text-sm font-semibold text-gray-700">Communication Rating</label>
                        <p class="text-gray-500 text-sm">How well did the director of communications facilitate updates and changes effectively?</p>
                        <input v-model="ratings.communication" type="range" id="communication" name="communication" min="1" max="5" step="0.1"
                            class="mt-1 block w-full" />
                        <p class="text-sm mt-1 mb-1">{{ ratings.communication }}</p>
                        <p v-if="errors['ratings.communication']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['ratings.communication'] }}</p>
                    </div>
                    <div class="mb-4">
                        <label for="facilities" class="block text-sm font-semibold text-gray-700">Facilities Rating</label>
                        <p class="text-gray-500 text-sm">How would you rate the facilities you visited?</p>
                        <input v-model="ratings.facilities" type="range" id="facilities" name="facilities" min="1" max="5" step="0.1"
                            class="mt-1 block w-full" />
                        <p class="text-sm mt-1 mb-1">{{ ratings.facilities }}</p>
                        <p v-if="errors['ratings.facilities']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['ratings.facilities'] }}</p>
                    </div>

                    <!-- Subject -->
                    <div class="mb-4">
                        <label for="subject" class="block text-sm font-semibold text-gray-700">Subject</label>
                        <input autocomplete=true v-model="subject" type="text" id="subject" name="subject"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <p v-if="errors.subject" class="text-red-500 text-sm mt-1 mb-1">{{ errors.subject }}</p>
                    </div>

                    <!-- Comment -->
                    <div class="mb-4">
                        <label for="comment" class="block text-sm font-semibold text-gray-700">Comment</label>
                        <textarea v-model="comment" id="comment" name="comment" rows="4"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        <p v-if="errors.comment" class="text-red-500 text-sm mt-1 mb-1">{{ errors.comment }}</p>
                    </div>

                    <div class="flex flex-col mt-10 items-end">
                        <BaseButton :loading="loading" type="submit" label="Submit"></BaseButton>
                    </div>
                </form>
                <!-- Optional: Show error or success message -->
                <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
                <p v-if="success" class="text-green-500 text-sm mt-4">{{ success }}</p>
            </div>
        </div>
    </main>
</template>