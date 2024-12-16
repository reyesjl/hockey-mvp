// src/stores/userStore.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  return { user, setUser }
})
