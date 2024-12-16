<template>
  <header
    :class="[
      'fixed z-[105] w-full border-solid border-b-[1px] border-[#0000004b] transition-all duration-300',
      isVisible ? 'top-0' : '-top-24'
    ]"
    aria-label="Main navigation"
  >
    <nav aria-label="Main">
      <div class="transform-gpu transition duration-300 h-[3.125rem] relative z-50 mx-auto w-full bg-navbar backdrop-blur-xl">
        <div class="container h-full flex items-center justify-between">
          <!-- Logo or Brand -->
          <RouterLink :to="{ name: 'home' }" class="font-semibold pr-4 text-black">
            YHT Reviews
          </RouterLink>

          <!-- Navigation Links -->
          <ul class="list-none flex text-sm space-x-4">
            <li>
              <RouterLink
                :to="{ name: 'home' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'about' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                About
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'tournaments' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Tournaments
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'community' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Community
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'support' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Support
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'signup' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Sign Up
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'login' }"
                class="h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
              >
                Login
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive variable to track header visibility
const isVisible = ref(true)
let lastScroll = 0

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