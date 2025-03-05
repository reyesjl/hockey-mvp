<!-- 
  Youth Hockey Tournaments

  Author: Jose Reyes
  Date: Dec 27, 2025

  Copyright © 2025 Jose Reyes. All rights reserved.

  This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
  in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.

  This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
  Any unauthorized use may result in legal action.

  For inquiries regarding licensing or permissions, please contact Jose Reyes.
-->
<script setup lang="ts">
import { ref } from 'vue'
import * as yup from 'yup';
import BaseButton from '@/lib/ui/BaseButton.vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import { CustomError } from '@/utils/CustomError'
import { loginSchema } from '@/utils/schemas/loginSchema'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const errors = ref<{ [key: string]: string }>({})

// Router instance for navigation
const router = useRouter()

const handleLogin = async () => {
  error.value = '';
  success.value = '';
  errors.value = {};

  loading.value = true;

  try {
    await loginSchema.validate({ email: email.value, password: password.value }, { abortEarly: false });
    await login(email.value, password.value);
    success.value = 'Logged in successfully.';
    router.push({ name: 'dashboard' });
  } catch (err: any) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((validationError: yup.ValidationError) => {
        if (validationError.path) {
          errors.value[validationError.path] = validationError.message;
        }
      });
    } else if (err instanceof CustomError) {
      error.value = err.message;
    } else {
      error.value = 'An unexpected error occurred.';
    }
  } finally {
    loading.value = false;
  }
}
</script> 

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
            <div class="mb-3">
              <label class="relative block mb-1">
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
              <p v-if="errors.email" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div class="mb-3">
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
              <p v-if="errors.password" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.password }}
              </p>
            </div>

            <div class="mt-2 w-full flex justify-end">
              <BaseButton
                label="Forgot Password?"
                variant="linkSecondary"
                class="text-xs"
                aria-label="Forgot Password"
              >
                Forgot Password?
              </BaseButton>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <BaseButton
              type="submit"
              :disabled="loading"
              label="Login"
              class="w-full shadow-xl"
            />
            <RouterLink
              :to="{ name: 'signup' }"
              class="text-center text-xs text-gray-500 underline"
              >Don't have an account? Create one!</RouterLink
            >
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

<style scoped></style>
