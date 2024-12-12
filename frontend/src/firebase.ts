// src/firebase.ts
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'

// Read from the environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Analytics is optional - will only work on deployed environments with HTTPS
// let analytics
// if (typeof window !== 'undefined') {
//   analytics = getAnalytics(app)
// }

// Export the initialized Firebase app (and analytics if needed)
export { app }
