// src/main.ts

import './assets/main.css' // Import main CSS first
import './assets/tailwind.css' // Import Tailwind CSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { auth } from '@/firebase' // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'
import { fetchAndSetUserClaims } from '@/services/userService'

import App from './App.vue'
import router from './router'

// Create a Pinia instance
const pinia = createPinia()

// Create the Vue app but do not mount it yet
const app = createApp(App)

// Use Pinia and Router
app.use(pinia)
app.use(router)

// Initialize User Store
const userStore = useUserStore()

// Load user from local storage first
userStore.loadStateFromLocalStorage()

// Set up Firebase Auth State Listener
onAuthStateChanged(auth, async firebaseUser => {
  if (firebaseUser) {
    // User is signed in.
    userStore.setUser(firebaseUser)
    console.log('user is logged in.')
    await fetchAndSetUserClaims()
  } else {
    // User is signed out.
    userStore.setUser(null)
    console.log('user is logged out.')
  }
  // Set loading to false after auth state is determined
  userStore.setLoading(false)
  console.log('user loading done.')
})

// Mount the app after setting up the auth listener
app.mount('#app')
