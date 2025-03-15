<template>
  <main class="max-w-screen-sm mx-auto p-4">
    <div class="justify-center mt-10 md:mt-16">
      <h1 class="mb-5 text-red-500 text-4xl font-semibold">
        [401] UNAUTHORIZED
      </h1>
      <h3 class="text-3xl font-semibold mb-5 ">
        This page went wide of the goal. Skate back to your dashboard.
      </h3>
    </div>
    <div class="flex max-w-96">
      <p>
        You don't have access to this page, here's your way back to your
        <router-link :to="{ name: 'dashboard' }" class="underline hover:no-underline"
          >dashboard.</router-link
        >
      </p>
    </div>
  </main>
</template>
<script>
export default {}
</script>
<style lang=""></style>
