<template>
  <main class="pt-[3.125rem] pb-20">
    <!-- User account navigation -->
    <div class="container mx-auto">
      <ul class="text-sm flex flex-row w-full">
        <li class="px-4">
          <div class="py-2">
            <RouterLink :to="{ name: 'dashboard' }">Home</RouterLink>
          </div>
        </li>
        <li class="px-4">
          <div class="py-2">
            <RouterLink :to="{ name: 'dashboard' }">Submissions</RouterLink>
          </div>
        </li>
        <li class="px-4">
          <div class="py-2">
            <RouterLink :to="{ name: 'edit-display-name' }">Display name</RouterLink>
          </div>
        </li>
        <li class="px-4">
          <div class="py-2">
            <RouterLink :to="{ name: 'edit-avatar' }"
              >Profile picture</RouterLink
            >
          </div>
        </li>
      </ul>
    </div>

    <div class="container mx-auto text-center">
      <div v-if="user">
        <!-- Profile Picture Container -->
        <div
          class="mt-10 md:mt-[16] mb-5 w-32 h-32 rounded-full shadow-lg overflow-hidden mx-auto relative group"
        >
          <!-- If user has a photo -->
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            alt="Profile Picture"
            class="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
          />
          <!-- Otherwise, use a placeholder robohash -->
          <div
            v-else
            class="flex items-center justify-center bg-gray-200 w-full h-full shadow-lg transition duration-300 group-hover:blur-sm"
          >
            <img
              :src="'https://robohash.org/' + user.displayName"
              alt="Profile Picture"
            />
          </div>

          <!-- Overlay (appears on hover) -->
          <RouterLink
            :to="{ name: 'edit-avatar' }"
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20"
          >
            <i class="fa-solid fa-camera text-white"></i>
          </RouterLink>
        </div>
        <p class="text-red-700 text-sm font-extrabold">admin</p>
        <p class="text-xl font-semibold">{{ user.displayName || 'N/A' }}</p>
        <p class="text-sm">
          {{ user.email || 'N/A' }}
          <i
            :class="
              user.emailVerified
                ? 'fa-solid fa-check text-green-500'
                : 'fa-solid fa-times text-red-500'
            "
          ></i>
        </p>
      </div>
      <div v-else>
        <p>User data is not available.</p>
      </div>
    </div>
    <!-- Edit user account -->
    <div class="flex justify-center gap-2 pt-4">
      <RouterLink :to="{ name: 'edit-display-name' }">
        <BaseButton
          iconRight="fa-solid fa-pencil"
          class="text-sm"
          label="edit profile"
          variant="primary"
        />
      </RouterLink>
      <button @click="handleLogout">
        <BaseButton
          iconRight="fa-solid fa-arrow-right-from-bracket"
          class="text-sm"
          label="logout"
          variant="primary"
        />
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/userService'

// Access userStore
const userStore = useUserStore()

// Get router instance
const router = useRouter()

// Computed property to get the current user
const user = computed(() => userStore.user)

// Logout function
const handleLogout = async () => {
  await logout()
  router.push({ name: 'login' })
}
</script>

<style scoped></style>
