// src/stores/userStore.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from 'firebase/auth'
import { auth } from '@/firebase'
import { fetchAndSetUserClaims } from '@/services/userService'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const isAdmin = ref(false)
  const claims = ref<Record<string, any> | null>(null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
    saveStateToLocalStorage()
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setAdmin = (adminStatus: boolean) => {
    isAdmin.value = adminStatus
    saveStateToLocalStorage()
  }

  const setClaims = (newClaims: Record<string, any> | null) => {
    claims.value = newClaims
    saveStateToLocalStorage()
  }

  const isLoggedIn = computed(() => user.value !== null)

  const saveStateToLocalStorage = () => {
    const state = {
      user: user.value,
      isAdmin: isAdmin.value,
      claims: claims.value,
    }
    localStorage.setItem('userStore', JSON.stringify(state))
  }

  const loadStateFromLocalStorage = () => {
    const storedState = localStorage.getItem('userStore')
    if (storedState) {
      const state = JSON.parse(storedState)
      user.value = state.user
      isAdmin.value = state.isAdmin
      claims.value = state.claims
    }
  }

  const clearStateFromLocalStorage = () => {
    localStorage.removeItem('userStore')
  }

  const refreshUserData = async () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      setUser(currentUser)
      await fetchAndSetUserClaims()
    }
  }

  return {
    user,
    setUser,
    isLoading,
    setLoading,
    isLoggedIn,
    isAdmin,
    setAdmin,
    claims,
    setClaims,
    loadStateFromLocalStorage,
    clearStateFromLocalStorage,
    refreshUserData
  }
})
