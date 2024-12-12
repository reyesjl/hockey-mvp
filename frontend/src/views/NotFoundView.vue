<template>
  <main class="max-w-screen-sm mx-auto p-4">
    <div class="mt-8 justify-center">
      <h3 class="text-3xl font-extrabold">
        This page went wide of the goal. Maybe try skating back to the homepage?
      </h3>
    </div>
    <div class="flex justify-end">
      <h1 class="text-sky-500 md:text-[10em] text-[8em] font-extrabold">
        404.
      </h1>
    </div>
    <div class="flex max-w-96">
      <p>
        Seems like we couldn't find this page, here's your way back to the
        <router-link :to="{ name: 'home' }" class="underline hover:no-underline"
          >homepage.</router-link
        >
      </p>
    </div>
  </main>
</template>
<script>
export default {}
</script>
<style lang=""></style>
