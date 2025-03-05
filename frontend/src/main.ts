// src/main.ts

import './assets/main.css' // Import main CSS first
import './assets/tailwind.css' // Import Tailwind CSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { auth } from '@/firebase' // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

// Create a Pinia instance
const pinia = createPinia()

// Create the Vue app but do not mount it yet
const app = createApp(App)

// Use Pinia and Router
app.use(pinia)
app.use(router)

// Initialize user data from localStorage
const authStore = useAuthStore();
const storedUser = localStorage.getItem('user');
if (storedUser) {
    authStore.setUser(JSON.parse(storedUser));
}

// Set up Firebase Auth State Listener
// Don't need this since we are using our own session.
// onAuthStateChanged(auth, async firebaseUser => {})

// Mount the app after setting up the auth listener
app.mount('#app')
