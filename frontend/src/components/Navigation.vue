<template lang="">
  <header class="fixed top-0 z-[105] w-full" aria-label="Main navigation">
    <nav aria-label="Main">
      <div
        class="ease-out-cubic transform-gpu transition duration-300 h-[3.125rem] relative z-50 mx-auto w-full bg-navbar backdrop-blur-xl"
      >
        <div class="container h-full flex items-center">
          <div class="flex none">
            <RouterLink :to="{ name: 'home' }" class="font-semibold pr-4"
              >YHT Reviews</RouterLink
            >
          </div>
          <ul class="list-none flex text-sm group/list">
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'home' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Home</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'about' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >About</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'tournaments' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Tournaments</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'community' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Community</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'support' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Support</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'signup' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Sign Up</RouterLink
              >
            </li>
            <li class="group/item group-hover/list:text-gray-500">
              <RouterLink
                :to="{ name: 'login' }"
                class="h-full flex items-center px-4 group-hover/item:text-black duration-300"
                >Login</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup></script>
<style lang=""></style>
