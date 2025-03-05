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
import { computed } from 'vue'

interface Props {
  path: string
  alt: string
  size: 'small' | 'medium' | 'large'
}

const props = defineProps<Props>()

const fullPath = computed(() => {
  return props.path ? `/src/assets/avatars/${props.path}` : '/src/assets/avatars/default_avatar.webp'
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-8 h-8'
    case 'medium':
      return 'w-16 h-16'
    case 'large':
      return 'w-60 h-60'
    default:
      return 'w-16 h-16'
  }
})
</script>

<template>
  <img :src="fullPath" :alt="alt" :class="[sizeClass, 'rounded-full object-cover shadow-xl']" />
</template>