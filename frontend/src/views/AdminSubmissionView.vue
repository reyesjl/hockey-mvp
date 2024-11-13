<template>
  <main class="container mx-auto py-10">
    <h1 class="text-3xl md:text-4xl font-extrabold mb-2">Submissions</h1>
    <p class="mb-8 text-gray-400">Select a submission to view the details.</p>

    <!-- Loading Indicator -->
    <div v-if="submissionStore.loading" class="text-center text-white">
      Loading submissions...
    </div>

    <!-- Error Message -->
    <div v-if="submissionStore.error" class="text-center text-red-500">
      {{ submissionStore.error }}
    </div>

    <!-- Submissions Table -->
    <div v-if="!submissionStore.loading && !submissionStore.error">
      <!-- Scrollable Container for the Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-white">
          <thead>
            <tr class="bg-transparent">
              <th class="px-4 py-2 border-b border-white">Name</th>
              <th class="px-4 py-2 border-b border-white">Email</th>
              <th class="px-4 py-2 border-b border-white">Status</th>
              <th class="px-4 py-2 border-b border-white">Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="submission in submissionStore.submissions"
              :key="submission._id"
              class="hover:bg-sky-700 cursor-pointer"
              @click="openModal(submission)"
            >
              <td class="px-4 py-2 border-b border-white">{{ submission.name }}</td>
              <td class="px-4 py-2 border-b border-white">{{ submission.submittedBy }}</td>
              <td class="px-4 py-2 border-b border-white">{{ submission.approvalStatus }}</td>
              <td class="px-4 py-2 border-b border-white">{{ new Date(submission.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Displaying Submission Details -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
    >
      <div class="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-2xl font-bold mb-4">Submission Details</h2>

        <!-- Display Submission Information -->
        <div class="mb-4">
          <strong>Name:</strong> {{ selectedSubmission.name }}
        </div>
        <div class="mb-4">
          <strong>Location:</strong> {{ selectedSubmission.location }}
        </div>
        <div class="mb-4">
          <strong>Dates: </strong> 
          <span>{{ selectedSubmission.dates.map(date => new Date(date).toLocaleDateString()).join(', ') }}</span>
        </div>
        <div class="mb-4">
          <strong>Contact Email:</strong> {{ selectedSubmission.contactEmail }}
        </div>
        <div class="mb-4">
          <strong>Company:</strong> {{ selectedSubmission.company }}
        </div>
        <div class="mb-4">
          <strong>Games Minimum:</strong> {{ selectedSubmission.gamesMinimum }}
        </div>
        <div class="mb-4">
          <strong>Level of Play:</strong> {{ selectedSubmission.levelOfPlay.join(', ') }}
        </div>
        <div class="mb-4">
          <strong>Age Groups:</strong> {{ selectedSubmission.ageGroups.join(', ') }}
        </div>
        <div class="mb-4">
          <strong>Approval Status:</strong> {{ selectedSubmission.approvalStatus }}
        </div>
        <div class="mb-4">
          <strong>Submitted By:</strong> {{ selectedSubmission.submittedBy }}
        </div>
        <div class="mb-4">
          <strong>Notes:</strong> <p>{{ selectedSubmission.notes }}</p>
        </div>

        <!-- Modal Close Button -->
        <button
          @click="closeModal"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTournamentSubmissionStore } from '@/stores/tournamentSubmissionStore';

const submissionStore = useTournamentSubmissionStore();
const modalOpen = ref(false);
const selectedSubmission = ref(null);

// Fetch the submissions on mounted
onMounted(() => {
  submissionStore.fetchTournamentSubmissions();
});

// Open the modal and set the selected submission
const openModal = (submission: any) => {
  selectedSubmission.value = submission;
  modalOpen.value = true;
};

// Close the modal
const closeModal = () => {
  modalOpen.value = false;
};
</script>

<style scoped>
</style>

