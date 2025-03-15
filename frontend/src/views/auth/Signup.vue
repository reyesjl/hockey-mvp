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
import { ref, onMounted } from 'vue'
import * as yup from 'yup'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { signup } from '@/services/authService'
import { signupSchema } from '@/utils/schemas/signupSchema'
import { CustomError } from '@/utils/CustomError'
import useAuth from '@/composables/useAuth'

const { user } = useAuth();

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);
const errors = ref<{ [key: string]: string }>({});

const router = useRouter()
const route = useRoute()

const handleSignUp = async () => {
  error.value = '';
  success.value = '';
  errors.value = {};

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match';
    return
  }

  loading.value = true

  try {
    await signupSchema.validate({ displayName: displayName.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value }, { abortEarly: false });
    await signup(email.value, password.value, displayName.value);
    success.value = 'Account created successfully. Please check your email to verify your account.';
    
    // Check for the next query parameter and redirect accordingly
    const nextRoute = route.query.next ? { path: route.query.next as string } : { name: 'login' };
    router.push(nextRoute);
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

onMounted(async () => {
  if (user.value) {
    router.push({ name: 'dashboard' });
  }
});

</script>

<template>
  <main class="pt-[3.125rem]">
    <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100">
      <div class="container">
        <form
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
          @submit.prevent="handleSignUp">
          <div class="flex justify-center mb-6">
            <i class="fa-solid fa-user text-black p-4 aspect-square bg-white rounded-xl shadow-xl"></i>
          </div>
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Sign up with email
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Contribute by adding new tournaments, writing reviews, & rating events.
            </p>
          </div>
          <div class="mb-8">
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Username</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-signature"></i>
                </span>
                <input v-model="displayName"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Username" type="text" name="displayName" autocomplete="name" />
              </label>
              <p v-if="errors.displayName" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.displayName }}
              </p>
            </div>
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Email</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-at"></i>
                </span>
                <input v-model="email"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Email" type="email" name="email" autocomplete="email" />
              </label>
              <p v-if="errors.email" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.email }}
              </p>
            </div>
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Password</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-lock"></i>
                </span>
                <input v-model="password"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Password" type="password" name="password" autocomplete="new-password" />
              </label>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.password }}
              </p>
            </div>
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Confirm Password</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-lock"></i>
                </span>
                <input v-model="confirmPassword"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Confirm Password" type="password" name="confirmPassword" autocomplete="new-password" />
              </label>
              <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <BaseButton type="submit" :disabled="loading" label="Get Started" class="w-full shadow-xl" />
            <RouterLink :to="{ name: 'login', query: { next: route.query.next } }" class="text-center text-xs text-gray-500 underline">Already have an
              account? Login.</RouterLink>
          </div>
          <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm mt-4">
            {{ success }}
          </p>
        </form>
      </div>
    </div>
  </main>
</template>