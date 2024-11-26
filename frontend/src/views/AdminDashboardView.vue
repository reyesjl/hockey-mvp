<template>
    <main class="container mx-auto py-10">
        <section class="mb-8">
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-4">Admin Dashboard</h1>
            <p>Select a widget or card below for actions.</p>
        </section>

        <!-- Loading Indicator -->
        <div v-if="adminStore.loading" class="text-center text-white">
        Loading metrics...
        </div>

        <!-- Error Message -->
        <div v-if="adminStore.error" class="text-center text-red-500">
        {{ adminStore.error }}
        </div>

        <!-- Dashboard Widgets -->
        <section v-if="!adminStore.loading && !adminStore.error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Submissions Widget -->
        <router-link to="/admin/dashboard/submissions" class="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 cursor-pointer transition duration-300">
            <h2 class="text-xl font-bold text-white mb-2">User Submissions</h2>
            <p class="text-3xl font-extrabold text-yellow-400">{{ adminStore.tournamentSubmissionCount }}</p>
            <p class="text-gray-400">Click to view submissions</p>
        </router-link>

        <!-- Flags Widget (Placeholder) -->
        <router-link to="/admin/dashboard/" class="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 cursor-pointer transition duration-300">
            <h2 class="text-xl font-bold text-white mb-2">Flagged Content</h2>
            <p class="text-3xl font-extrabold text-red-400">5</p>
            <p class="text-gray-400">Click to view flagged items</p>
        </router-link>

        <!-- Total tournaments -->
        <router-link to="/tournaments" class="bg-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-700 cursor-pointer transition duration-300">
            <h2 class="text-xl font-bold text-white mb-2">Tournaments</h2>
            <p class="text-3xl font-extrabold text-sky-400">{{ adminStore.tournamentCount }}</p>
            <p class="text-gray-400">Click to view tournaments</p>
        </router-link>

        </section>
    </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdminDashboardStore } from '@/stores/adminDashboardStore';

const adminStore = useAdminDashboardStore();

// Fetch counts to display metrics
onMounted(() => {
    adminStore.fetchAdminMetrics();
});
</script>

<style>
</style>