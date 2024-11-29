<template>
    <!-- Add your main content here -->
    <div class="header">
        <h1 class="text-3xl font-semibold">Dashboard</h1>
    </div>
    <div class="flex space-x-4 mt-4">
        <!-- Tournament Count Widget -->
        <div class="widget bg-gray-200 text-black rounded-lg p-6 flex-1">
            <h2 class="text-lg mb-2">Tournaments</h2>
            <p class="text-4xl font-bold">{{ tournamentCount }}</p>
        </div>

        <!-- Tournament Submissions Widget -->
        <div class="widget bg-gray-200 text-black rounded-lg p-6 flex-1">
            <h2 class="text-lg mb-2">Submissions</h2>
            <p class="text-4xl font-bold">{{ tournamentSubmissionCount }}</p>
        </div>

        <!-- Placeholder for a Future Metric Widget -->
        <div class="widget bg-gray-200 text-black rounded-lg p-6 flex-1">
            <h2 class="text-lg mb-2">Flags</h2>
            <p class="text-4xl font-bold">{{ flagCount }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAdminDashboardStore } from '@/stores/adminDashboardStore';

// Use the store to manage fetching and storing state globally
const adminStore = useAdminDashboardStore();

// Define local refs for storing metrics
const tournamentCount = ref(0);
const tournamentSubmissionCount = ref(0);
const flagCount = ref(0);

// Loading and error states
const loading = ref(false);
const error = ref<string | null>(null);

// Fetch counts to display metrics on mount
onMounted(async () => {
    loading.value = true;
    error.value = null;

    // Fetch data using the store
    await adminStore.fetchAdminMetrics();

    // Update local refs with the data from the store
    tournamentCount.value = adminStore.tournamentCount;
    tournamentSubmissionCount.value = adminStore.tournamentSubmissionCount;
    flagCount.value = adminStore.flagCount;
    
    // Set loading and error states from the store
    loading.value = adminStore.loading;
    error.value = adminStore.error;
});
</script>

<style></style>