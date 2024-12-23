// src/main.ts

import './assets/main.css' // Import main CSS first
import './assets/tailwind.css' // Import Tailwind CSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { auth } from '@/firebase' // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'

import App from './App.vue'
import router from './router'

import ProgressBar from '@/lib/ui/ProgressBar.vue'

// Create a Pinia instance
const pinia = createPinia()

// Create the Vue app but do not mount it yet
const app = createApp(App)

// Use Pinia and Router
app.use(pinia)
app.use(router)

// Initialize User Store
const userStore = useUserStore()

// Add ProgressBar globally
app.component('ProgressBar', ProgressBar)

// Set up Firebase Auth State Listener
onAuthStateChanged(auth, firebaseUser => {
  if (firebaseUser) {
    // User is signed in.
    userStore.setUser(firebaseUser)
    console.log('user is logged in.')
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
