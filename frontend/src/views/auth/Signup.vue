<template lang="html">
  <main class="pt-[3.125rem]">
    <!-- Full background -->
    <div
      class="w-full h-screen bg-gradient-to-b from-blue-200 to-blue-100 fixed"
    >
      <!-- Invisible form wrapper -->
      <div class="container">
        <!-- Actual form element -->
        <form
          class="mt-10 md:mt-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
        >
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-plus text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
            ></i>
          </div>
          <!-- Form header -->
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Sign up with email
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Contribute by adding new tournaments, writing reviews, & rating
              events.
            </p>
          </div>

          <!-- Form fields -->
          <div class="mb-8">
            <label class="relative block mb-3">
              <span class="sr-only">Email</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-at"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Email"
                type="email"
                name="email"
              />
            </label>
            <label class="relative block">
              <span class="sr-only">Password</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-lock"></i>
              </span>
              <input
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Password"
                type="password"
                name="password"
              />
            </label>
          </div>

          <div class="flex">
            <BaseButton label="Get Started" class="w-full shadow-xl" />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/lib/ui/BaseButton.vue'
</script>

<style lang=""></style>
