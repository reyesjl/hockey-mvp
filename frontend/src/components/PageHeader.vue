<template>
    <main class="container mx-auto">
        <div class="pt-4 mb-8">
            <h1 class="text-3xl font-bold text-gray-400">{{ props.title }}</h1>
            <p class="mt-2 text-lg text-gray-600">{{ props.description }}</p>
        </div>
    </main>
</template>

<script setup lang="ts">
// Define props for title and description
const props = defineProps<{
    title: string;
    description: string;
}>()
</script>

<style scoped></style>