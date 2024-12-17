<!-- src/views/auth/Account.vue -->
<template>
  <main class="pt-[3.125rem]">
    <div class="container mx-auto pb-20">
      <h1 class="mt-10 md:mt-[16] text-2xl font-bold mb-4">My Account</h1>
      <div v-if="user">
        <!-- Profile Picture -->
        <div class="mb-5 w-32 h-32 rounded-full overflow-hidden">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            alt="Profile Picture"
            class="w-full h-full object-cover"
          />
          <div v-else class="flex items-center justify-center bg-gray-200 w-full h-full">
            <i class="fa-solid fa-user text-gray-500 text-3xl"></i>
          </div>
        </div>
        <p><strong>Name:</strong> {{ user.displayName || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ user.email }} <i v-if="user.emailVerified"
            class="text-xs fa-solid fa-circle-check text-green-500" aria-label="Email Verified"></i>
          <span v-else>
            <i class="text-xs fa-solid fa-circle-xmark text-red-500" aria-label="Email Not Verified"></i>
          </span>
        </p>

        <!-- Update Display Name Form -->
        <div class="mt-6">
          <h2 class="font-semibold mb-2">Update Display Name</h2>
          <form @submit.prevent="changeDisplayName" class="flex flex-col md:flex-row items-start md:items-center">
            <div class="flex items-center">
              <label class="relative block mr-2">
                <span class="sr-only">Email</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-signature"></i>
                </span>
                <input v-model="newDisplayName"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Enter display name" type="text" name="newDisplayName" required />
              </label>

              <div class="flex">
                <BaseButton :type="'submit'" :disabled="isUpdating" label="save" class="w-full shadow-xl bg-green-500"
                  iconLeft="fa-solid fa-floppy-disk" />
              </div>
            </div>
          </form>

          <!-- Feedback Messages -->
          <div class="mt-2">
            <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Update Profile Picture Form (Enter URL) -->
        <div class="mt-6">
          <h2 class="font-semibold mb-2">Update Profile Picture (URL)</h2>
          <form @submit.prevent="updatePhotoURL" class="flex flex-col md:flex-row items-start md:items-center">
            <div class="flex items-center">
              <label class="relative block mr-2">
                <span class="sr-only">Profile Picture URL</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-image"></i>
                </span>
                <input v-model="newPhotoURL"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Enter image URL" type="url" name="newPhotoURL" required />
              </label>

              <div class="flex">
                <BaseButton :type="'submit'" :disabled="isUpdatingPhoto" label="Save" class="w-full shadow-xl bg-blue-500"
                  iconLeft="fa-solid fa-floppy-disk" />
              </div>
            </div>
          </form>

          <!-- Feedback Messages -->
          <div class="mt-2">
            <p v-if="successPhotoMessage" class="text-green-500">{{ successPhotoMessage }}</p>
            <p v-if="errorPhotoMessage" class="text-red-500">{{ errorPhotoMessage }}</p>
          </div>
        </div>

        <div class="mt-5">
          <BaseButton label="logout" @click="handleLogout"
            class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300" />

        </div>
        <!-- Add more user details as needed -->
      </div>
      <div v-else>
        <p>User data is not available.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

// Access userStore
const userStore = useUserStore()

// Computed property to get the current user
const user = computed(() => userStore.user)

// Router instance for navigation
const router = useRouter()

// Reactive variables for new display name and feedback messages
const newDisplayName = ref('')
const isUpdating = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Reactive variables for updating photoURL via URL
const newPhotoURL = ref('')
const isUpdatingPhoto = ref(false)
const successPhotoMessage = ref('')
const errorPhotoMessage = ref('')

// Helper function to generate a random 4-digit number
const generateRandom4Digit = (): string => {
  const randomNumber = Math.floor(Math.random() * 10000) // 0 to 9999
  return randomNumber.toString().padStart(4, '0') // Ensures 4 digits with leading zeros
}

// Logout handler
const handleLogout = async () => {
  try {
    await signOut(auth)
    // Optionally, redirect to home or login page
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Error logging out:', error)
    // Optionally, display an error message to the user
  }
}

// Change Display Name handler
const changeDisplayName = async () => {
  // Clear previous messages
  successMessage.value = ''
  errorMessage.value = ''

  // Trim the new display name to remove extra spaces
  let trimmedName = newDisplayName.value.trim()

  // Basic validation
  if (!trimmedName) {
    errorMessage.value = 'Display name cannot be empty.'
    return
  }

  if (trimmedName.length > 20) {
    errorMessage.value = 'Display name cannot be greater than 20 characters.'
    return
  }

  // Optional: Add more validation (e.g., allowed characters)
  const validNameRegex = /^[A-Za-z0-9_]+$/ // Allows letters, numbers, underscores
  if (!validNameRegex.test(trimmedName)) {
    errorMessage.value = 'Only letters, numbers, and underscores allowed.'
    return
  }

  // Generate a random 4-digit number
  const random4Digit = generateRandom4Digit()

  // Append the random number to the display name
  // Ensure that we don't append multiple suffixes if the user updates their name multiple times
  // For example, "Pinocho#2645#1234" is undesirable
  // Therefore, remove any existing # followed by 4 digits before appending
  const existingSuffixRegex = /#\d{4}$/
  if (existingSuffixRegex.test(trimmedName)) {
    trimmedName = trimmedName.replace(existingSuffixRegex, '')
  }

  const updatedDisplayName = `${trimmedName}#${random4Digit}`

  isUpdating.value = true

  try {
    if (auth.currentUser) {
      // Update the display name in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: updatedDisplayName,
      })

      // Update the user in the store
      userStore.setUser({
        ...auth.currentUser,
        displayName: updatedDisplayName,
      })

      successMessage.value = 'Display name updated successfully.'
      newDisplayName.value = '' // Reset the input field
    } else {
      throw new Error('No authenticated user found.')
    }
  } catch (error: any) {
    console.error('Error updating display name:', error)
    errorMessage.value = error.message || 'Failed to update display name.'
  } finally {
    isUpdating.value = false
  }
}

// Update PhotoURL via URL handler
const updatePhotoURL = async () => {
  // Clear previous messages
  successPhotoMessage.value = ''
  errorPhotoMessage.value = ''

  const trimmedURL = newPhotoURL.value.trim()

  // Basic validation
  if (!trimmedURL) {
    errorPhotoMessage.value = 'Photo URL cannot be empty.'
    return
  }

  // Optional: Validate URL format
  try {
    new URL(trimmedURL)
  } catch (_) {
    errorPhotoMessage.value = 'Please enter a valid URL.'
    return
  }

  isUpdatingPhoto.value = true

  try {
    if (auth.currentUser) {
      // Update the photoURL in Firebase Auth
      await updateProfile(auth.currentUser, {
        photoURL: trimmedURL,
      })

      // Update the user in the store
      userStore.setUser({
        ...auth.currentUser,
        photoURL: trimmedURL,
      })

      successPhotoMessage.value = 'Profile picture updated successfully.'
      newPhotoURL.value = '' // Reset the input field
    } else {
      throw new Error('No authenticated user found.')
    }
  } catch (error: any) {
    console.error('Error updating photoURL:', error)
    errorPhotoMessage.value = error.message || 'Failed to update profile picture.'
  } finally {
    isUpdatingPhoto.value = false
  }
}
</script>

<style scoped>
/* Add any styles specific to the Account page */
</style>
