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
import { useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";
import BaseButton from "@/lib/ui/BaseButton.vue";
import { CustomError } from '@/utils/CustomError'
import { axiosInstance } from "@/config/apiConfig";
import { tournamentSchema } from "@/utils/schemas/tournamentSchema";

// State variables
const name = ref<string>("");
const dates = ref<Date[]>([]);
const location = ref<{ city: string, state: string }>({ city: "", state: "" });
const description = ref<string>("");
const minimumGames = ref<number>(1);
const levelOfPlay = ref<string[]>([]);
const ageGroups = ref<string[]>([]);
const details = ref<{ usa_sanctioned: boolean, stay_and_play: boolean, extended_checkout: boolean }>({ usa_sanctioned: true, stay_and_play: false, extended_checkout: false });
const gender = ref<string>("both");
const hardware = ref<{ first_place: string, second_place: string }>({ first_place: "", second_place: "" });
const discounts = ref<{ multi_team: boolean, early_bird: string, other: string }>({ multi_team: false, early_bird: "", other: "" });
const companyName = ref<string>("");
const companyEmail = ref<string>("");

const success = ref<string | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null); // General error message
const errors = ref<{ [key: string]: string }>({})   // Form validation errors

const { user } = useAuth();

const router = useRouter();

const addDate = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.value) {
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust for timezone offset
        if (date > new Date() && !dates.value.some(d => d.getTime() === date.getTime())) {
            dates.value.push(date);
        }
        input.value = "";
    }
};

const removeDate = (date: Date) => {
    dates.value = dates.value.filter(d => d.getTime() !== date.getTime());
};

const createTournament = async () => {
    loading.value = true;
    error.value = null;
    errors.value = {};

    const tournamentData = {
        name: name.value,
        location: location.value,
        company: { name: companyName?.value, email: companyEmail.value },
        submitted_by: user.value?._id || null,
        description: description.value,
        dates: dates.value,
        minimum_games: minimumGames.value,
        level_of_play: levelOfPlay.value,
        age_groups: ageGroups.value,
        details: details.value,
        gender: gender.value,
        hardware: hardware.value,
        discounts: discounts.value,
    };

    try {
        await tournamentSchema.validate(tournamentData, { abortEarly: false });
        const response = await axiosInstance.post('/tournaments', tournamentData);
        const { success, message, data } = response.data;
        // Handle successful creation
        router.push({ name: 'tournament', params: { id: data._id } });
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
            error.value = 'An unexpected error occurred.';
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
                    <div class="text-3xl text-black font-semibold">New Tournament</div>
                    <div class="text-sm text-gray-500">submitted by @{{ user?.username }}</div>
                </div>
                <!-- Tournament form -->
                <form @submit.prevent="createTournament"
                    class="bg-gradient-to-b from-sky-200 to-sky-100 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <!-- Tournament name -->
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-semibold text-gray-700">Tournament
                            Name</label>
                        <input autocomplete=true v-model="name" type="text" id="name" name="name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <p v-if="errors.name" class="text-red-500 text-sm mt-1 mb-1">{{ errors.name }}</p>
                    </div>

                    <!-- City, State -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- City -->
                        <div class="mb-4">
                            <label for="city" class="block text-sm font-semibold text-gray-700">City</label>
                            <input v-model="location.city" type="text" id="city" name="city"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            <p v-if="errors['location.city']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['location.city'] }}</p>
                        </div>
                        <!-- State -->
                        <div class="mb-4">
                            <label for="state" class="block text-sm font-semibold text-gray-700">State</label>
                            <select v-model="location.state" id="state" name="state"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select a state</option>
                                <!-- US States -->
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="DC">D.C.</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">New Hampshire</option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">North Carolina</option>
                                <option value="North Dakota">North Dakota</option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
                                <!-- Canadian Provinces -->
                                <option value="Alberta">Alberta</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="New Brunswick">New Brunswick</option>
                                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                <option value="Nova Scotia">Nova Scotia</option>
                                <option value="Ontario">Ontario</option>
                                <option value="Prince Edward Island">Prince Edward Island</option>
                                <option value="Quebec">Quebec</option>
                                <option value="Saskatchewan">Saskatchewan</option>
                                <option value="Northwest Territories">Northwest Territories</option>
                                <option value="Nunavut">Nunavut</option>
                                <option value="Yukon">Yukon</option>
                            </select>
                            <p v-if="errors['location.state']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['location.state'] }}</p>
                        </div>
                    </div>

                    <!-- Company name and email -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap:2 md:gap-4">
                        <!-- Company name -->
                        <div class="mb-4">
                            <label for="companyName" class="block text-sm font-semibold text-gray-700">Tournament Company Name</label>
                            <input v-model="companyName" type="text" id="companyName" name="companyName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                        " />
                            <p v-if="errors['company.name']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['company.name'] }}</p>
                        </div>

                        <!-- Company email -->
                        <div class="mb-4">
                            <label for="companyEmail" class="block text-sm font-semibold text-gray-700">Tournament Company Email</label>
                            <input v-model="companyEmail" type="email" id="companyEmail" name="companyEmail" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                        " />
                            <p v-if="errors['company.email']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['company.email'] }}</p>
                        </div>
                    </div>

                    <!-- Tournament description -->
                    <div class="mb-4">
                        <label for="description"
                            class="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea v-model="description" id="description"
                            name="description" rows="3"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        <p v-if="errors.description" class="text-red-500 text-sm mt-1 mb-1">{{ errors.description }}</p>
                    </div>

                    <!-- Tournament dates -->
                    <div class="mb-4">
                        <label for="dates" class="block text-sm font-semibold text-gray-700">Dates</label>
                        <input @change="addDate" type="date" id="dates" name="dates"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div class="mt-2 flex flex-wrap">
                            <span v-for="date in dates" :key="date.getTime()" class="text-sm italic font-semibold bg-gray-200 text-gray-500 px-2 rounded-full mr-2 mb-2 flex items-center">
                                {{ date.toLocaleDateString() }}
                                <button @click.prevent="removeDate(date)" class="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                                    &times;
                                </button>
                            </span>
                        </div>
                        <p v-if="errors.dates" class="text-red-500 text-sm mt-1 mb-1">{{ errors.dates }}</p>
                    </div>

                    <!-- Level of Play -->
                    <div class="mb-5">
                        <label class="block text-sm font-semibold text-gray-700">Level of Play</label>
                        <div class="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="level in ['AAA', 'AA', 'A', 'B', 'C/Rec/House']" :key="level" class="flex items-center">
                                <input :id="level" type="checkbox" :value="level" v-model="levelOfPlay" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label :for="level" class="ml-2 block text-sm text-gray-700">{{ level }}</label>
                            </div>
                        </div>
                        <p v-if="errors.level_of_play" class="text-red-500 text-sm mt-1 mb-1">{{ errors.level_of_play }}</p>
                    </div>

                    <!-- Age Groups -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Age Groups</label>
                        <div class="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="ageGroup in ['8U', '10U', '12U', '14U', '16U', '18U', 'Midget', 'Junior', 'Varsity', 'Adult/Rec']" :key="ageGroup" class="flex items-center">
                                <input :id="ageGroup" type="checkbox" :value="ageGroup" v-model="ageGroups" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label :for="ageGroup" class="ml-2 block text-sm text-gray-700">{{ ageGroup }}</label>
                            </div>
                        </div>
                        <p v-if="errors.age_groups" class="text-red-500 text-sm mt-1 mb-1">{{ errors.age_groups }}</p>
                    </div>

                    <!-- Gender -->
                    <div class="mb-4">
                        <label for="gender" class="block text-sm font-semibold text-gray-700">Gender</label>
                        <select v-model="gender" id="gender" name="gender"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="both">Both</option>
                            <option value="boys">Boys</option>
                            <option value="girls">Girls</option>
                        </select>
                        <p v-if="errors.gender" class="text-red-500 text-sm mt-1 mb-1">{{ errors.gender }}</p>
                    </div>

                    <!-- Minimum Games -->
                    <div class="mb-4">
                        <label for="minimumGames" class="block text-sm font-semibold text-gray-700">Minimum Games</label>
                        <input v-model="minimumGames" type="number" id="minimumGames" name="minimumGames"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <p v-if="errors.minimum_games" class="text-red-500 text-sm mt-1 mb-1">{{ errors.minimum_games }}</p>
                    </div>

                    <!-- Hardware -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Hardware</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="firstPlace" class="block text-sm font-medium text-gray-700">First Place</label>
                                <input v-model="hardware.first_place" type="text" id="firstPlace" name="firstPlace"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <p v-if="errors['hardware.first_place']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['hardware.first_place'] }}</p>
                            </div>
                            <div>
                                <label for="secondPlace" class="block text-sm font-medium text-gray-700">Second Place</label>
                                <input v-model="hardware.second_place" type="text" id="secondPlace" name="secondPlace"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <p v-if="errors['hardware.second_place']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['hardware.second_place'] }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Discounts -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Discounts</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center">
                                <input v-model="discounts.multi_team" type="checkbox" id="multiTeam" name="multiTeam"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="multiTeam" class="ml-2 block text-sm text-gray-700">Multi-Team Discount</label>
                            </div>
                            <div>
                                <label for="earlyBird" class="block text-sm font-medium text-gray-700">Early Bird Discount</label>
                                <input v-model="discounts.early_bird" type="text" id="earlyBird" name="earlyBird"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <p v-if="errors['discounts.early_bird']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['discounts.early_bird'] }}</p>
                            </div>
                            <div>
                                <label for="otherDiscount" class="block text-sm font-medium text-gray-700">Other Discount</label>
                                <input v-model="discounts.other" type="text" id="otherDiscount" name="otherDiscount"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <p v-if="errors['discounts.other']" class="text-red-500 text-sm mt-1 mb-1">{{ errors['discounts.other'] }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Details</label>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="flex items-center">
                                <input v-model="details.usa_sanctioned" type="checkbox" id="usaSanctioned" name="usaSanctioned"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="usaSanctioned" class="ml-2 block text-sm text-gray-700">USA Sanctioned</label>
                            </div>
                            <div class="flex items-center">
                                <input v-model="details.stay_and_play" type="checkbox" id="stayAndPlay" name="stayAndPlay"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="stayAndPlay" class="ml-2 block text-sm text-gray-700">Stay and Play</label>
                            </div>
                            <div class="flex items-center">
                                <input v-model="details.extended_checkout" type="checkbox" id="extendedCheckout" name="extendedCheckout"
                                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="extendedCheckout" class="ml-2 block text-sm text-gray-700">Extended Checkout</label>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col mt-10 items-end">
                        <BaseButton
                        type="submit"
                        :disabled="loading"
                        label="Submit"
                        class="w-fit px-10 shadow-xl"
                        />
                    </div>
                </form>
                <!-- Optional: Show error or success message -->
                <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
                <p v-if="success" class="text-green-500 text-sm mt-4">{{ success }}</p>
            </div>
        </div>
    </main>
</template>