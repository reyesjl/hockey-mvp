<template>
  <main class="flex h-screen">
    <!-- Sidebar Navigation -->
    <div class="sidebar w-1/5 p-4 mt-8 text-white">
      <ul class="flex flex-col">
        <!-- Dashboard Link with Exact Matching -->
        <li class="w-full">
          <router-link
            to="/admin/dashboard/"
            class="block w-full p-3 rounded-lg text-gray-500 duration-200 hover:bg-gray-500 hover:text-white"
            exact-active-class="bg-gray-700 text-white"
          >
            <i class="fa-solid fa-table-cells-large mr-4"></i> Dashboard
          </router-link>
        </li>
        <!-- Submissions Link -->
        <li class="w-full">
          <router-link
            to="/admin/dashboard/submissions"
            class="block w-full p-3 rounded-lg text-gray-500 duration-200 hover:bg-gray-500 hover:text-white"
            active-class="bg-gray-700 text-white"
          >
            <i class="fa-solid fa-envelope-open-text mr-4"></i> Submissions
          </router-link>
        </li>
        <!-- Tournaments Link -->
        <li class="w-full">
          <router-link
            to="/admin/dashboard/tournaments"
            class="block w-full p-3 rounded-lg text-gray-500 duration-200 hover:bg-gray-500 hover:text-white"
            active-class="bg-gray-700 text-white"
          >
            <i class="fa-solid fa-trophy mr-4"></i> Tournaments
          </router-link>
        </li>
        <!-- Flags Link -->
        <li class="w-full">
          <router-link
            to="/admin/dashboard/flags"
            class="block w-full p-3 rounded-lg text-gray-500 duration-200 hover:bg-gray-500 hover:text-white"
            active-class="bg-gray-700 text-white"
          >
            <i class="fa-solid fa-flag mr-4"></i> Flags
          </router-link>
        </li>
      </ul>
    </div>
    <!-- Main Content Area -->
    <div class="content px-4 pt-8 flex-1">
      <router-view />
      <!-- This is where the nested content will be displayed -->
    </div>
  </main>
</template>

<script setup lang="ts">
// Import and setup logic as required
</script>

<style scoped></style>
