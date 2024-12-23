<!-- src/components/Navbar.vue -->

<template>
  <header
    :class="[
      'fixed z-40 w-full border-solid border-b-[1px] border-[#0000002c] transition-all duration-300',
      isVisible ? 'top-0' : '-top-24',
    ]"
    aria-label="Main navigation"
  >
    <nav aria-label="Main">
      <div
        class="transform-gpu transition duration-300 h-[3.125rem] relative mx-auto w-full backdrop-blur-xl"
      >
        <div class="container h-full relative flex items-center">
          <!-- Left section: Logo or Brand -->
          <div class="absolute left-[1rem] flex-shrink-0 flex items-center">
            <RouterLink
              :to="{ name: 'home' }"
              class="text-nowrap font-semibold text-black"
            >
              YHT Reviews
            </RouterLink>
          </div>

          <!-- Center section: Main navigation -->
          <div class="hidden absolute left-1/2 transform -translate-x-1/2 flex-grow md:flex justify-center items-center">
            <ul class="list-none flex text-sm">
              <li>
                <RouterLink
                  :to="{ name: 'home' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'about' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'tournaments' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Tournaments
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'community' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Community
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'support' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Support
                </RouterLink>
              </li>
            </ul>
          </div>
          <!-- Right: Auth menu -->
          <div class="absolute right-[1rem] flex-shrink-0 flex items-center">
            <ul class="list-none flex text-sm">
              <!-- Conditional Links -->
              <li v-if="!user">
                <RouterLink
                  :to="{ name: 'signup' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Sign Up
                </RouterLink>
              </li>
              <li v-if="!user">
                <RouterLink
                  :to="{ name: 'login' }"
                  class="text-nowrap h-full flex items-center pl-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Login
                </RouterLink>
              </li>

              <li v-if="user" class="relative">
                <RouterLink :to="{ name: 'account' }" class="flex items-center">
                  <img
                    :src="user.photoURL ? user.photoURL : 'https://robohash.org/' + user.displayName"
                    alt="User Avatar"
                    class="w-9 h-9 rounded-full object-cover shadow-sm"
                  />
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

// Reactive variable to track header visibility
const isVisible = ref(true)
let lastScroll = 0

// Access userStore
const userStore = useUserStore()

// Computed property to get the current user
const user = computed(() => userStore.user)

// Scroll event handler
const handleScroll = () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down and scrolled more than 100px
    isVisible.value = false
  } else {
    // Scrolling up
    isVisible.value = true
  }

  lastScroll = currentScroll
}

onMounted(() => {
  lastScroll = window.pageYOffset
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
