<template>
  <main class="pt-[3.125rem]">
    <!-- Full background -->
    <div
      class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100"
    >
      <!-- Invisible form wrapper -->
      <div class="container">
        <!-- Actual form element -->
        <form
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
        >
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-hockey-puck text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
            ></i>
          </div>

          <!-- Form header -->
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Submit a Tournament
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Add a new tournament to our directory. Once approved, it will be
              visible on our platform.
            </p>
          </div>

          <!-- Form fields -->
          <div class="mb-8">
            <!-- Tournament Name -->
            <label class="relative block mb-3">
              <span class="sr-only">Tournament Name</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-tag"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Tournament Name"
                type="text"
                name="name"
              />
            </label>

            <!-- Location -->
            <label class="relative block mb-3">
              <span class="sr-only">Location</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-location-dot"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Location (e.g. Richmond, VA)"
                type="text"
                name="location"
              />
            </label>

            <!-- Dates -->
            <label class="relative block mb-3">
              <span class="sr-only">Dates</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-calendar-days"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="date"
                name="dates"
              />
            </label>

            <!-- Contact Email -->
            <label class="relative block mb-3">
              <span class="sr-only">Contact Email</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-envelope"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Contact Email"
                type="email"
                name="contactEmail"
              />
            </label>

            <!-- Games Minimum -->
            <label class="relative block mb-3">
              <span class="sr-only">Minimum Games</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-hashtag"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Minimum Games"
                type="number"
                name="gamesMinimum"
                min="1"
              />
            </label>
          </div>

          <div class="flex">
            <BaseButton label="Submit Tournament" class="w-full shadow-xl" />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/lib/ui/BaseButton.vue'
</script>

<style scoped></style>
