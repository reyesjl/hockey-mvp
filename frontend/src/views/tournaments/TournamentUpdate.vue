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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { axiosInstance } from "@/config/apiConfig";
import BaseButton from "@/lib/ui/BaseButton.vue";
import useAuth from "@/composables/useAuth";

// State variables
const tournamentName = ref<string>("");
const tournamentDates = ref<Date[]>([]);
const tournamentLocation = ref<{ city: string, state: string }>({ city: "", state: "" });
const tournamentDescription = ref<string>("");
const minimumGames = ref<number>(1);
const levelOfPlay = ref<string[]>([]);
const ageGroups = ref<string[]>([]);
const details = ref<{ usa_sanctioned: boolean, stay_and_play: boolean, extended_checkout: boolean }>({ usa_sanctioned: true, stay_and_play: false, extended_checkout: false });
const gender = ref<string>("both");
const hardware = ref<{ first_place: string, second_place: string }>({ first_place: "", second_place: "" });
const discounts = ref<{ multi_team: boolean, early_bird: string, other: string }>({ multi_team: false, early_bird: "", other: "" });
const companyName = ref<string>("");
const companyEmail = ref<string>("");
const visibilityState = ref<string>("pending");
const visibilityReason = ref<string>("");

const success = ref<string | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const formErrors = ref<Record<string, string[]>>({});

const { user } = useAuth();
const route = useRoute();
const router = useRouter();

const tournamentId = route.params.id;

const fetchTournament = async () => {
    try {
        const response = await axiosInstance.get(`/tournaments/${tournamentId}`);
        const tournament = response.data.data;
        tournamentName.value = tournament.name;
        tournamentDates.value = tournament.dates.map((date: string) => new Date(date));
        tournamentLocation.value = tournament.location;
        tournamentDescription.value = tournament.description;
        minimumGames.value = tournament.minimum_games;
        levelOfPlay.value = tournament.level_of_play;
        ageGroups.value = tournament.age_groups;
        details.value = tournament.details;
        gender.value = tournament.gender;
        hardware.value = tournament.hardware;
        discounts.value = tournament.discounts;
        companyName.value = tournament.company.name;
        companyEmail.value = tournament.company.email;
        visibilityState.value = tournament.visible.state;
        visibilityReason.value = tournament.visible.reason;
    } catch (err: any) {
        error.value = err.response?.data?.message || 'An error occurred';
    }
};

onMounted(() => {
    fetchTournament();
});

const addDate = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.value) {
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust for timezone offset
        if (date > new Date() && !tournamentDates.value.some(d => d.getTime() === date.getTime())) {
            tournamentDates.value.push(date);
        }
        input.value = "";
    }
};

const removeDate = (date: Date) => {
    tournamentDates.value = tournamentDates.value.filter(d => d.getTime() !== date.getTime());
};

const updateTournament = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axiosInstance.patch(`/tournaments/${tournamentId}`, {
            name: tournamentName.value,
            location: tournamentLocation.value,
            company: { name: companyName?.value, email: companyEmail.value },
            description: tournamentDescription.value,
            dates: tournamentDates.value,
            minimum_games: minimumGames.value,
            level_of_play: levelOfPlay.value,
            age_groups: ageGroups.value,
            details: details.value,
            gender: gender.value,
            hardware: hardware.value,
            discounts: discounts.value,
            visible: {
                state: visibilityState.value,
                reason: visibilityReason.value
            }
        });
        router.push({ name: 'tournament', params: { id: tournamentId } });
        success.value = 'Tournament updated successfully';
    } catch (err: any) {
        error.value = err.response?.data?.message || 'An error occurred';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <main class="pt-[3.125rem]">
        <!-- Full background -->
        <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100 pb-20">
            <!-- Invisible form wrapper -->
            <div class="container max-w-4xl">
                <div class="mt-10 md:mt-16 mb-5">
                    <div class="text-3xl text-black font-semibold">Update Tournament</div>
                    <div class="text-sm text-gray-500">submitted by @{{ user?.username }}</div>
                </div>
                <!-- Tournament form -->
                <form @submit.prevent="updateTournament"
                    class="bg-gradient-to-b from-sky-200 to-sky-100 shadow-xl rounded-lg px-8 pt-6 pb-8">
                    <!-- Tournament name -->
                    <div class="mb-4">
                        <label for="tournamentName" class="block text-sm font-semibold text-gray-700">Tournament
                            Name</label>
                        <input v-model="tournamentName" type="text" id="tournamentName" name="tournamentName"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>

                    <!-- City, State -->
                    <div class="grid grid-cols-2 gap-4">
                        <!-- City -->
                        <div class="mb-4">
                            <label for="city" class="block text-sm font-semibold text-gray-700">City</label>
                            <input v-model="tournamentLocation.city" type="text" id="city" name="city"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <!-- State -->
                        <div class="mb-4">
                            <label for="state" class="block text-sm font-semibold text-gray-700">State</label>
                            <select v-model="tournamentLocation.state" id="state" name="state"
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
                        </div>
                    </div>

                    <!-- Company name and email -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap:2 md:gap-4">
                        <!-- Company name -->
                        <div class="mb-4">
                            <label for="companyName" class="block text-sm font-semibold text-gray-700">Tournament Company Name</label>
                            <input v-model="companyName" type="text" id="companyName" name="companyName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                        " />
                        </div>

                        <!-- Company email -->
                        <div class="mb-4">
                            <label for="companyEmail" class="block text-sm font-semibold text-gray-700">Tournament Company Email</label>
                            <input v-model="companyEmail" type="email" id="companyEmail" name="companyEmail" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                        " />
                        </div>
                    </div>

                    <!-- Tournament description -->
                    <div class="mb-4">
                        <label for="tournamentDescription"
                            class="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea v-model="tournamentDescription" id="tournamentDescription"
                            name="tournamentDescription" rows="3"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>

                    <!-- Visibility State -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Visibility State</label>
                        <div class="mt-2">
                            <div class="flex items-center">
                                <input type="radio" id="pending" value="pending" v-model="visibilityState" class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                                <label for="pending" class="ml-2 block text-sm text-gray-700">Pending</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="approved" value="approved" v-model="visibilityState" class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                                <label for="approved" class="ml-2 block text-sm text-gray-700">Approved</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" id="rejected" value="rejected" v-model="visibilityState" class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                                <label for="rejected" class="ml-2 block text-sm text-gray-700">Rejected</label>
                            </div>
                        </div>
                    </div>

                    <!-- Visibility Reason -->
                    <div class="mb-4" v-if="visibilityState === 'rejected'">
                        <label for="visibilityReason" class="block text-sm font-semibold text-gray-700">Reason for Rejection</label>
                        <textarea v-model="visibilityReason" id="visibilityReason" name="visibilityReason" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>

                    <!-- Tournament dates -->
                    <div class="mb-4">
                        <label for="tournamentDates" class="block text-sm font-semibold text-gray-700">Dates</label>
                        <input @change="addDate" type="date" id="tournamentDates" name="tournamentDates"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <div class="mt-2 flex flex-wrap">
                            <span v-for="date in tournamentDates" :key="date.getTime()" class="text-sm italic font-semibold bg-gray-200 text-gray-500 px-2 rounded-full mr-2 mb-2 flex items-center">
                                {{ date.toLocaleDateString() }}
                                <button @click.prevent="removeDate(date)" class="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                                    &times;
                                </button>
                            </span>
                        </div>
                    </div>

                    <!-- Level of Play -->
                    <div class="mb-5">
                        <label class="block text-sm font-semibold text-gray-700">Level of Play</label>
                        <div class="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="level in ['AAA', 'AA', 'A', 'B', 'C/Rec/House']" :key="level" class="flex items-center">
                                <input type="checkbox" :value="level" v-model="levelOfPlay" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label :for="level" class="ml-2 block text-sm text-gray-700">{{ level }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Age Groups -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Age Groups</label>
                        <div class="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="ageGroup in ['8U', '10U', '12U', '14U', '16U', '18U', 'Midget', 'Junior', 'Varsity', 'Adult/Rec']" :key="ageGroup" class="flex items-center">
                                <input type="checkbox" :value="ageGroup" v-model="ageGroups" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label :for="ageGroup" class="ml-2 block text-sm text-gray-700">{{ ageGroup }}</label>
                            </div>
                        </div>
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
                    </div>

                    <!-- Hardware -->
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Hardware</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="firstPlace" class="block text-sm font-medium text-gray-700">First Place</label>
                                <input v-model="hardware.first_place" type="text" id="firstPlace" name="firstPlace"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label for="secondPlace" class="block text-sm font-medium text-gray-700">Second Place</label>
                                <input v-model="hardware.second_place" type="text" id="secondPlace" name="secondPlace"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                            </div>
                            <div>
                                <label for="otherDiscount" class="block text-sm font-medium text-gray-700">Other Discount</label>
                                <input v-model="discounts.other" type="text" id="otherDiscount" name="otherDiscount"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                        label="Update"
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