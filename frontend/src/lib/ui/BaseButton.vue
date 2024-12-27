<template>
  <button
    :class="computedClasses"
    :disabled="disabled || loading"
    @click="onClick"
    :type="type"
  >
    <span v-if="loading" class="inline-block animate-spin mr-2">
      <i class="fa-solid fa-spinner"></i>
    </span>

    <div class="flex items-center gap-2">
      <!-- Icon to the left -->
      <i v-if="iconLeft" :class="iconLeft"></i>

      <span>{{ label }}</span>

      <!-- Icon to the right -->
      <i v-if="iconRight" :class="iconRight"></i>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  raised: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  iconLeft: {
    type: String,
    default: '', // e.g. "fa-solid fa-circle-info"
  },
  iconRight: {
    type: String,
    default: '', // e.g. "fa-solid fa-chevron-right"
  },
  type: {
    type: String,
    default: 'button',
  },
})

const emit = defineEmits(['click'])

const onClick = event => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const variantClasses = {
  primary: 'bg-black text-white hover:bg-gray-500',
  secondary: 'bg-black hover:bg-gray-500 text-white',
  alternate: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  linkPrimary: 'underline underline-offset-4 text-white hover:text-gray-500',
  linkSecondary: 'underline underline-offset-4 text-sky-500 hover:text-sky-800',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
}

const raisedClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const computedClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-1',
    'duration-200',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ]

  const variantClass = variantClasses[props.variant] || variantClasses.primary
  const sizeClass = sizeClasses[props.size] || sizeClasses.md
  const raisedClass = raisedClasses[props.raised] || ''

  return [baseClasses.join(' '), variantClass, sizeClass, raisedClass].join(' ')
})
</script>
