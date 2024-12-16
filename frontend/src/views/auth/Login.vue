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
          @submit.prevent="handleLogin"
        >
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-right-to-bracket text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
            ></i>
          </div>

          <!-- Form header -->
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Login with email
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Contribute by adding new tournaments, writing reviews, & rating
              events.
            </p>
          </div>

          <!-- Form fields -->
          <div class="mb-8">
            <!-- Email -->
            <label class="relative block mb-3">
              <span class="sr-only">Email</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-at"></i>
              </span>
              <input
                v-model="email"
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Email"
                type="email"
                name="email"
                autocomplete="email"
              />
            </label>

            <!-- Password -->
            <label class="relative block">
              <span class="sr-only">Password</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-lock"></i>
              </span>
              <input
                v-model="password"
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Password"
                type="password"
                name="password"
                autocomplete="current-password"
              />
            </label>
          </div>

          <div class="flex">
            <BaseButton
              :type="'submit'"
              :disabled="isLoading"
              label="Login"
              class="w-full shadow-xl"
            />
          </div>

          <!-- Optional: Show error or success message -->
          <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm mt-4">
            {{ success }}
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase' // Adjust the path if necessary
import BaseButton from '@/lib/ui/BaseButton.vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    )
    // userCredential.user contains the user info
    success.value = 'Logged in successfully!'
    // Optional: Redirect the user or perform other actions
    // e.g., router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
