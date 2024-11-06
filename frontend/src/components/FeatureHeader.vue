<template>
    <main class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Text Section -->
            <div class="flex-1 text-center md:text-left">
                <h1 class="text-3xl font-bold text-gray-400">{{ props.title }}</h1>
                <p class="mt-2 text-lg text-gray-600">{{ props.description }}</p>
            </div>

            <!-- Image Section -->
            <div class="flex-1">
                <img 
                    :src="props.imageSrc" 
                    :alt="props.imageAlt" 
                    class="w-full rounded-lg shadow-md"
                />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props for title, description, and image source
const props = defineProps<{
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
}>()
</script>

<style scoped></style>