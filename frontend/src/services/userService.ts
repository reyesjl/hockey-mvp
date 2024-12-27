// frontend/src/services/userService.ts

import { auth } from '@/firebase'
import { updateProfile, signOut } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'

export const setDisplayName = async (newDisplayName: string) => {
  const userStore = useUserStore()
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: newDisplayName })
    userStore.setUser({ ...auth.currentUser, displayName: newDisplayName })
  } else {
    throw new Error('No authenticated user found.')
  }
}

export const setPhotoURL = async (newPhotoURL: string) => {
  const userStore = useUserStore()
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { photoURL: newPhotoURL })
    userStore.setUser({ ...auth.currentUser, photoURL: newPhotoURL })
  } else {
    throw new Error('No authenticated user found.')
  }
}

export const fetchAndSetUserClaims = async () => {
  const userStore = useUserStore()
  if (userStore.user) {
    const idTokenResult = await userStore.user.getIdTokenResult()
    const claims = idTokenResult.claims
    userStore.setClaims(claims)
    userStore.setAdmin(claims.admin === true)
  } else {
    userStore.setClaims(null)
    userStore.setAdmin(false)
  }
}

export const logout = async () => {
  const userStore = useUserStore()
  try {
    userStore.setUser(null)
    userStore.setClaims(null)
    userStore.setAdmin(false)
    userStore.clearStateFromLocalStorage()
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
