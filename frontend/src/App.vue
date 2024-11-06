<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
</script>

<template>
    <Navigation />

    <RouterView class="text-white" />
</template>

<style scoped></style>
