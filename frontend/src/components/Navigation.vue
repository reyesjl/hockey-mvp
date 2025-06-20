<!-- 
  Youth Hockey Tournaments

  Author: Jose Reyes
  Date: Dec 27, 2025

  Copyright © 2025 Jose Reyes. All rights reserved.

  This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
  in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.

  This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
  Any unauthorized use may result in legal action.

  For inquiries regarding licensing or permissions, please contact Jose Reyes.
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import useAuth from '@/composables/useAuth'
import Avatar from '@/lib/ui/Avatar.vue'

// Reactive variable to track header visibility
const isVisible = ref(true)
const isMobileMenuOpen = ref(false)
let lastScroll = 0


// Get the current user from the composable
const { user } = useAuth()

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

// Mobile menu visibility handler
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  lastScroll = window.pageYOffset
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

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
        class="transform-gpu transition duration-300 h-[3.125rem] relative mx-auto w-full backdrop-blur-xl bg-white/20"
      >
        <div class="container h-full relative flex items-center">
          <!-- Left section: Logo or Brand -->
          <div class="absolute left-2 flex-shrink-0 flex items-center">
            <RouterLink
              :to="{ name: 'home' }"
              class="text-nowrap font-semibold text-black"
            >
              YHT Reviews
            </RouterLink>
          </div>

          <!-- Center section: Main navigation -->
          <div
            class="hidden absolute left-1/2 transform-gpu -translate-x-1/2 flex-grow md:flex justify-center items-center"
          >
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
          <div class="absolute right-2 flex-shrink-0 flex items-center gap-2">
            <ul class="list-none flex text-sm">
              <!-- Conditional Links -->
              <li v-if="!user" class="hidden md:block">
                <RouterLink
                  :to="{ name: 'signup' }"
                  class="text-nowrap h-full flex items-center px-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Sign Up
                </RouterLink>
              </li>
              <li v-if="!user" class="hidden md:block">
                <RouterLink
                  :to="{ name: 'login' }"
                  class="text-nowrap h-full flex items-center pl-4 text-gray-700 hover:text-black transition-colors duration-300"
                >
                  Login
                </RouterLink>
              </li>

              <li v-if="user" class="relative">
                <RouterLink :to="{ name: 'dashboard' }" class="flex items-center">
                  <Avatar :path="user?.avatar || ''" alt="User Avatar" size="small" />
                </RouterLink>
              </li>
            </ul>
            <div
              @click="toggleMobileMenu"
              class="text-xl md:hidden cursor-pointer"
            >
              <i class="fa-solid fa-bars text-black"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Mobile Nav Menu -->
  <div
    class="fixed top-0 w-full h-full z-50 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl transition-transform duration-300 ease-in-out transform-gpu"
    :class="{
      'translate-y-0': isMobileMenuOpen,
      'translate-y-full': !isMobileMenuOpen,
    }"
  >
    <button
      @click="toggleMobileMenu"
      aria-label="Close menu"
      class="text-3xl absolute top-5 right-5 text-black"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
    <ul
      class="list-none align-middle text-center flex flex-col text-3xl space-y-4"
    >
      <li>
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'home' }"
          class="text-nowrap text-gray-700 hover:text-black transition-colors duration-300"
        >
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'about' }"
          class="text-nowrap items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          About
        </RouterLink>
      </li>
      <li>
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'tournaments' }"
          class="text-nowrap items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Tournaments
        </RouterLink>
      </li>
      <li>
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'community' }"
          class="text-nowrap items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Community
        </RouterLink>
      </li>
      <li>
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'support' }"
          class="text-nowrap items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Support
        </RouterLink>
      </li>
      <!-- Conditional Links -->
      <li v-if="!user">
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'signup' }"
          class="text-nowrap h-full items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Sign Up
        </RouterLink>
      </li>
      <li v-if="!user">
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'login' }"
          class="text-nowrap h-full items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Login
        </RouterLink>
      </li>

      <li v-if="user" class="relative">
        <RouterLink
          @click="toggleMobileMenu"
          :to="{ name: 'dashboard' }"
          class="text-nowrap h-full items-center text-gray-700 hover:text-black transition-colors duration-300"
        >
          Account
        </RouterLink>
      </li>
    </ul>
  </div>
</template>