<template>
  <main class="pt-[3.125rem]">
    <!-- Full background -->
    <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100">
      <!-- Invisible form wrapper -->
      <div class="container">
        <!-- Actual form element -->
        <form class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white">
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i class="fa-solid fa-pen text-black p-4 aspect-square bg-white rounded-xl shadow-xl"></i>
          </div>

          <!-- Form header -->
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Submit Your Review
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Share your experience about the tournament you attended.
            </p>
          </div>

          <!-- Form fields -->
          <div class="mb-8">
            <!-- Title -->
            <label class="relative block mb-3">
              <span class="sr-only">Title</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-heading"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Review Title"
                type="text"
                name="title"
              />
            </label>

            <!-- Content (Review Body) -->
            <label class="relative block mb-3">
              <span class="sr-only">Content</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-sticky-note"></i>
              </span>
              <textarea
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-32"
                placeholder="Share your experience... 250 chars max"
                name="content"
              ></textarea>
            </label>

            <!-- Parking Notes -->
            <label class="relative block mb-3">
              <span class="sr-only">Parking Notes</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-car"></i>
              </span>
              <textarea
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-25"
                placeholder="Parking Notes (optional)"
                type="text"
                name="parkingNotes"
              ></textarea>
            </label>

            <!-- Attended Date -->
            <span class="text-slate-400 text-sm">Date you attended</span>
            <label class="relative block mb-3">
              <span class="sr-only">Attended Date</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-calendar-days"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="date"
                name="attendedDate"
              />
            </label>

            <!-- Hidden fields for tournamentId, userUid if needed -->
            <!-- <input type="hidden" name="tournamentId" value="..." /> -->
            <!-- <input type="hidden" name="userUid" value="..." /> -->
          </div>

          <div class="flex">
            <BaseButton label="Submit Review" class="w-full shadow-xl" />
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
