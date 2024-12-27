<template>
  <main class="pt-[3.125rem]">
    <!-- Full background -->
    <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100">
      <!-- Invisible form wrapper -->
      <div class="container">
        <!-- Actual form element -->
        <form
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
          @submit.prevent="handleLogin">
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i class="fa-solid fa-right-to-bracket text-black p-4 aspect-square bg-white rounded-xl shadow-xl"></i>
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
              <input v-model="email"
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Email" type="email" name="email" autocomplete="email" />
            </label>

            <!-- Password -->
            <label class="relative block">
              <span class="sr-only">Password</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-lock"></i>
              </span>
              <input v-model="password"
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Password" type="password" name="password" autocomplete="current-password" />
            </label>
            <div class="mt-2 w-full flex justify-end">
              <BaseButton @click="handleForgotPassword" label="Forgot Password?" variant="linkSecondary" class="text-xs"
                :disabled="isSendingReset" aria-label="Forgot Password">
                Forgot Password?
              </BaseButton>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <BaseButton type="submit" :disabled="isLoading" label="Login" class="w-full shadow-xl" />
            <RouterLink :to="{ name: 'signup' }" class="text-center text-xs text-gray-500 underline">Don't have an
              account? Create one!</RouterLink>
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
import { ref, onMounted } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '@/firebase'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { logout } from '@/services/userService'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)
const isSendingReset = ref(false)

// Router instance for navigation
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  if (userStore.user) {
    router.push({ name: 'account' })
  }
})

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
    const user = userCredential.user

    if (user.emailVerified) {
      // Email is verified, proceed to account page
      success.value = 'Logged in successfully!'
      if (userStore.isAdmin) {
        router.push({ name: 'admin' })
      } else {
        router.push({ name: 'account' })
      }
    } else {
      // Email is not verified, sign out the user
      await logout()
      error.value =
        'Your email is not verified. Please verify your email to proceed. New email has been sent. Check spam too.'

      // Send verification email
      await sendEmailVerification(user)
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Handle Forgot Password
const handleForgotPassword = async () => {
  // Clear previous messages
  error.value = ''
  success.value = ''

  // Trim the email to remove extra spaces
  const trimmedEmail = email.value.trim()

  // Validate email presence
  if (!trimmedEmail) {
    error.value = 'Please enter your email, and try again.'
    return
  }

  // Optional: Validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  isSendingReset.value = true

  try {
    await sendPasswordResetEmail(auth, trimmedEmail)
    success.value = 'The password reset link has been sent to your email.'
  } catch (err: any) {
    error.value = err.message
  } finally {
    isSendingReset.value = false
  }
}
</script>

<style scoped></style>
