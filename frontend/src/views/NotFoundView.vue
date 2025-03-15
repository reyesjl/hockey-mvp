<template>
  <main class="max-w-screen-sm mx-auto p-4">
    <div class="justify-center mt-10 md:mt-16">
      <h1 class="mb-5 text-sky-500 text-4xl font-semibold">
        [404] Not Found
      </h1>
      <h3 class="text-3xl font-semibold mb-5 ">
        This page went wide of the goal. Try skating back home?
      </h3>
    </div>
    <div class="flex max-w-96">
      <p>
        Seems this page doesn't exist, here's your way back 
        <router-link :to="{ name: 'home' }" class="underline hover:no-underline"
          >home.</router-link
        >
      </p>
    </div>
  </main>
</template>
<script>
export default {}
</script>
<style lang=""></style>
