<!-- src/components/Navbar.vue -->

<template>
  <header
    :class="[
      'fixed z-[105] w-full border-solid border-b-[1px] border-[#0000002c] transition-all duration-300',
      isVisible ? 'top-0' : '-top-24',
    ]"
    aria-label="Main navigation"
  >
    <nav aria-label="Main">
      <div
        class="transform-gpu transition duration-300 h-[3.125rem] relative z-50 mx-auto w-full bg-navbar backdrop-blur-xl overflow-x-auto overflow-y-hidden"
      >
        <div class="container h-full flex items-center">
          <!-- Left section: Logo or Brand -->
          <div class="flex-shrink-0">
            <RouterLink
              :to="{ name: 'home' }"
              class="text-nowrap font-semibold pr-4 text-black"
            >
              YHT Reviews
            </RouterLink>
          </div>

          <!-- Left section: Main navigation -->
          <div class="flex-grow flex justify-center">
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
          <div class="flex-shrink-0">
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
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Login
                </RouterLink>
              </li>

              <li v-if="user">
                <RouterLink
                  :to="{ name: 'account' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  {{ user.displayName?.split("#")[0] || 'Account' }}
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

<style scoped>
/* Optional: Adjust the transition timing if needed */
</style>