<template>
    <div class="container py-10 md:py-20">
        <div class="max-w-2xl mx-auto p-6 rounded-lg bg-white">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Leave a Review</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
                <!-- Tournament ID (Hidden) -->
                <input type="hidden" v-model="form.tournamentId" />

                <!-- Submitted By -->
                <div>
                    <label for="submittedBy" class="block text-sm font-medium text-gray-700">Your Email</label>
                    <input type="email" id="submittedBy" v-model="form.submittedBy" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Comment -->
                <div>
                    <label for="comment" class="block text-sm font-medium text-gray-700">Your Comment</label>
                    <textarea id="comment" v-model="form.comment" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>

                <!-- Parking Notes -->
                <div>
                    <label for="parkingNotes" class="block text-sm font-medium text-gray-700">Parking Notes (Optional)</label>
                    <textarea id="parkingNotes" v-model="form.parkingNotes"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>

                <!-- Overall Rating -->
                <div>
                    <label for="overallRating" class="block text-sm font-medium text-gray-700">Overall Rating (1-5)</label>
                    <input type="number" id="overallRating" v-model="form.overallRating" min="1" max="5" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Referee Rating -->
                <div>
                    <label for="refereeRating" class="block text-sm font-medium text-gray-700">Referee Rating (1-5)</label>
                    <input type="number" id="refereeRating" v-model="form.refereeRating" min="1" max="5" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <!-- Communication Rating -->
                <div>
                    <label for="communicationRating" class="block text-sm font-medium text-gray-700">Communication Rating (1-5)</label>
                    <input type="number" id="communicationRating" v-model="form.communicationRating" min="1" max="5" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <button type="submit"
                        :disabled="loading"
                        class="w-full bg-sky-700 hover:bg-sky-500 text-white font-semibold py-2 rounded-full shadow-sm">
                    Submit Review
                </button>
            </form>
        </div>

        <!-- Modal Pop-up for Successful Submission -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 p-5">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Review Submitted!</h3>
                <p class="text-gray-600 mb-4">Your review has been submitted successfully.</p>
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
                <h3 class="text-xl font-semibold text-red-600 mb-4">Error Submitting Review</h3>
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
    props: {
        tournamentId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            form: {
                tournamentId: this.tournamentId,
                submittedBy: '',
                comment: '',
                parkingNotes: '',
                overallRating: 1,
                refereeRating: 1,
                communicationRating: 1
            },
            errorMessage: '',
            showModal: false,
            loading: false
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            try {
                const response = await fetch('http://localhost:5000/api/v1/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit review');
                }

                this.errorMessage = '';
                this.showModal = true;
                this.resetForm();
            } catch (error) {
                this.errorMessage = error.message;
            } finally {
                this.loading = false;
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
                tournamentId: this.tournamentId,
                submittedBy: '',
                comment: '',
                parkingNotes: '',
                overallRating: 1,
                refereeRating: 1,
                communicationRating: 1
            };
        }
    }
};
</script>

<style scoped>
/* TailwindCSS classes are already included */
</style>
