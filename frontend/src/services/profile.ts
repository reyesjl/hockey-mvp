import { auth } from '@/firebase'
import { updateProfile, signOut } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

export const setDisplayName = async (newDisplayName: string) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: newDisplayName })
    userStore.setUser({ ...auth.currentUser, displayName: newDisplayName })
  } else {
    throw new Error('No authenticated user found.')
  }
}

export const setPhotoURL = async (newPhotoURL: string) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { photoURL: newPhotoURL })
    userStore.setUser({ ...auth.currentUser, photoURL: newPhotoURL })
  } else {
    throw new Error('No authenticated user found.')
  }
}

export const logout = async () => {
  try {
    userStore.setUser(null)
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
