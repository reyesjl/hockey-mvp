<template>
  <div class="rating-component flex items-center gap-1">
    <i
      v-for="index in 5"
      :key="index"
      :class="getStarClass(index)"
      class="text-gray-300"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      required: true,
      validator: value => value >= 1.0 && value <= 5.0,
    },
  },
  methods: {
    getStarClass(index) {
      return index <= Math.round(this.rating)
        ? 'fa-solid fa-star'
        : 'fa-regular fa-star'
    },
  },
}
</script>

<style scoped>
/* You can add styles here if needed */
</style>
