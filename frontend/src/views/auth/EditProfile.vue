<template>
  <main class="pt-[3.125rem]">
    <div class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100">
      <div class="container">
        <form
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
          @submit.prevent="handleUpdateProfile"
        >
          <div class="flex justify-center mb-6">
            <i class="fa-solid fa-user text-black p-4 aspect-square bg-white rounded-xl shadow-xl"></i>
          </div>
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">Edit Profile</h2>
          </div>
          <div class="mb-8">
            <p class="text-xl font-semibold text-center mb-3">{{ user?.displayName || 'N/A' }}</p>
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
                />
              </label>
              <p v-if="errors.displayName" class="text-red-500 text-sm mt-1 mb-1">{{ errors.displayName }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <BaseButton type="submit" label="Save" class="w-full shadow-xl" />
          </div>
          <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm mt-4">{{ success }}</p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { updateProfile } from 'firebase/auth'
import BaseButton from '@/lib/ui/BaseButton.vue'
import * as yup from 'yup'
import router from '@/router'

// Access userStore
const userStore = useUserStore()

// Computed property to get the current user
const user = computed(() => userStore.user)

// Reactive variables for form fields
const displayName = ref('')
const error = ref('')
const success = ref('')
const errors = ref<{ [key: string]: string }>({})

// Validation schema
const schema = yup.object().shape({
  displayName: yup.string().nullable(),
})

const validateForm = async (): Promise<boolean> => {
  try {
    await schema.validate({
      displayName: displayName.value,
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

// Function to update profile
const handleUpdateProfile = async () => {
  error.value = ''
  success.value = ''

  if (!(await validateForm())) {
    return
  }

  try {
    if (user.value) {
      await updateProfile(user.value, {
        displayName: displayName.value || user.value.displayName,
      })
      success.value = 'Profile updated successfully'
      router.push({ name: 'account' })
    }
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<style scoped></style>