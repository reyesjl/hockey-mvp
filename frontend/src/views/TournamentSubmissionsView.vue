<template>
    <div class="container py-10 md:py-20">
        <div class="max-w-2xl mx-auto p-6 rounded-lg bg-white">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Submit a Tournament</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Tournament Name</label>
                    <input type="text" id="name" v-model="form.name" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Location -->
                <div>
                    <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="location" v-model="form.location" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Dates -->
                <div>
                    <label for="dates" class="block text-sm font-medium text-gray-700">Dates (Select at least
                        one)</label>
                    <input type="date" id="dates" v-model="newDate" @change="addDate"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <ul v-if="form.dates.length" class="mt-2">
                        <li v-for="(date, index) in form.dates" :key="index"
                            class="text-sm text-gray-700 flex items-center">
                            {{ new Date(date).toLocaleDateString() }}
                            <button type="button" @click="removeDate(index)"
                                class="ml-2 text-red-500 hover:text-red-700">Remove</button>
                        </li>
                    </ul>
                </div>

                <!-- Contact Email -->
                <div>
                    <label for="contactEmail" class="block text-sm font-medium text-gray-700">Tournament Contact
                        Email</label>
                    <input type="email" id="contactEmail" v-model="form.contactEmail" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Games Minimum -->
                <div>
                    <label for="gamesMinimum" class="block text-sm font-medium text-gray-700">Games Minimum</label>
                    <input type="number" id="gamesMinimum" v-model="form.gamesMinimum" min="1" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Level of Play Checklist -->
                <div>
                    <label for="levelOfPlay" class="block text-sm font-medium text-gray-700">Levels of Play</label>
                    <div class="flex flex-wrap mt-1">
                        <div v-for="level in VALID_LEVELS_OF_PLAY" :key="level" class="flex items-center mr-4 mb-2">
                            <input type="checkbox" :id="'level-' + level" :value="level" v-model="form.levelOfPlay"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label :for="'level-' + level" class="ml-2 text-sm text-gray-700">{{ level }}</label>
                        </div>
                    </div>
                </div>

                <!-- Age Groups Checklist -->
                <div>
                    <label for="ageGroups" class="block text-sm font-medium text-gray-700">Age Groups</label>
                    <div class="flex flex-wrap mt-1">
                        <div v-for="ageGroup in VALID_AGE_GROUPS" :key="ageGroup" class="flex items-center mr-4 mb-2">
                            <input type="checkbox" :id="'ageGroup-' + ageGroup" :value="ageGroup"
                                v-model="form.ageGroups"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label :for="'ageGroup-' + ageGroup" class="ml-2 text-sm text-gray-700">{{ ageGroup
                                }}</label>
                        </div>
                    </div>
                </div>

                <!-- Submitted By -->
                <div>
                    <label for="submittedBy" class="block text-sm font-medium text-gray-700">Your Email</label>
                    <input type="email" id="submittedBy" v-model="form.submittedBy" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Notes and Company (Optional) -->
                <div>
                    <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea id="notes" v-model="form.notes"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>

                <div>
                    <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                    <input type="text" id="company" v-model="form.company"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <button type="submit"
                    class="w-full bg-sky-700 hover:bg-sky-500 text-white font-semibold py-2 rounded-full shadow-sm">Submit
                    Tournament</button>
            </form>
        </div>

        <!-- Modal Pop-up for Successful Submission -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 p-5">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Tournament Submitted!</h3>
                <p class="text-gray-600 mb-4">Your tournament has been submitted successfully.</p>
                <a href="#" class="text-blue-600 hover:text-blue-800">View Live Status</a>
                <div class="mt-4">
                    <button @click="closeModal" class="bg-sky-700 hover:bg-sky-500 text-white py-2 px-4 rounded-full">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Error Modal -->
        <div v-if="errorMessage" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 p-5">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 class="text-xl font-semibold text-red-600 mb-4">Error Submitting Tournament</h3>
                <p class="text-sm text-gray-700 mb-4">{{ errorMessage }}</p>
                <button @click="closeErrorModal" class="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full">
                    Close
                </button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                location: '',
                dates: [],
                contactEmail: '',
                gamesMinimum: 1,
                levelOfPlay: [],
                ageGroups: [],
                submittedBy: '',
                notes: '',
                company: ''
            },
            newDate: '',
            VALID_LEVELS_OF_PLAY: ['AAA', 'AA', 'A', 'B', 'C/Rec/House'],
            VALID_AGE_GROUPS: ['8U', '10U', '12U', '14U', '16U', '18U', 'Midget', 'Junior', 'Varsity', 'Adult/Rec'],
            errorMessage: '',
            successMessage: '',
            showModal: false,
        };
    },
    methods: {
        addDate() {
            if (this.newDate && !this.form.dates.includes(this.newDate)) {
                this.form.dates.push(this.newDate);
                this.newDate = '';
            }
        },
        removeDate(index) {
            this.form.dates.splice(index, 1);
        },
        async handleSubmit() {
            try {
                const response = await fetch('http://localhost:5000/api/v1/tournament-submissions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit tournament');
                }

                this.errorMessage = '';

                this.showModal = true;
                this.resetForm();
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        closeModal() {
            this.showModal = false;
        },
        closeErrorModal() {
            this.errorMessage = '';
        },
        resetForm() {
            this.form = {
                name: '',
                location: '',
                dates: [],
                contactEmail: '',
                gamesMinimum: 1,
                levelOfPlay: [],
                ageGroups: [],
                submittedBy: '',
                notes: '',
                company: ''
            };
            this.newDate = '';
        }
    }
};
</script>

<style scoped>
/* No additional styling needed; using Tailwind CSS */
</style>
