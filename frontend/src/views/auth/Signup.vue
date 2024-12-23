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
          @submit.prevent="handleSignUp"
        >
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-user text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
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
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Display Name</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-signature"></i>
                </span>
                <input
                  v-model="displayName"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Display Name"
                  type="text"
                  name="displayName"
                  autocomplete="name"
                />
              </label>
              <p v-if="errors.displayName" class="text-red-500 text-sm mt-1 mb-1">{{ errors.displayName }}</p>
            </div>
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
              <p v-if="errors.email" class="text-red-500 text-sm mt-1 mb-1">{{ errors.email }}</p>
            </div>
            <div class="mb-3">
              <label class="relative block mb-1">
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
                  autocomplete="new-password"
                />
              </label>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1 mb-1">{{ errors.password }}</p>
            </div>
            <div class="mb-3">
              <label class="relative block mb-1">
                <span class="sr-only">Confirm Password</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-lock"></i>
                </span>
                <input
                  v-model="confirmPassword"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  autocomplete="new-password"
                />
              </label>
              <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1 mb-1">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <BaseButton
              type="submit"
              :disabled="isLoading"
              label="Get Started"
              class="w-full shadow-xl"
            />
            <RouterLink
              :to="{ name: 'login' }"
              class="text-center text-xs text-gray-500 underline"
              >Already have an account? Login.</RouterLink
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

<script setup lang="ts">
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '@/firebase'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { setDisplayName } from '@/services/profile'
import * as yup from 'yup'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const displayName = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)
const errors = ref<{ [key: string]: string }>({})

const schema = yup.object().shape({
  displayName: yup.string().required('Display name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(4096, 'Password must be less than 4096 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[\W_]/, 'Password must contain a special character'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
})

const validateForm = async (): Promise<boolean> => {
  try {
    await schema.validate({
      displayName: displayName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }, { abortEarly: false })
    errors.value = {}
    return true
  } catch (err: any) {
    errors.value = err.inner.reduce((acc: any, curr: any) => {
      acc[curr.path] = curr.message
      return acc
    }, {})
    return false
  }
}

const handleSignUp = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  if (!(await validateForm())) {
    isLoading.value = false
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    )

    const user = userCredential.user

    // Update display name
    await setDisplayName(displayName.value)

    // send verification email
    await sendEmailVerification(user)

    // sign them out
    await signOut(auth)

    success.value =
      'Account created. You must verify your email before you can login.'
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>
