// src/stores/userStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true) // Add a loading state

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return { user, setUser, isLoading, setLoading }
})
