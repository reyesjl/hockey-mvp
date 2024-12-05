<!-- StatsBlock Component -->
<template>
  <div class="stats-block flex flex-col items-center min-w-fit">
    <div class="text-gray-400 uppercase text-xs md:text-sm">{{ title }}</div>
    <div class="text-gray-300 text-xl font-semibold">{{ value }}</div>
    <div v-if="suffix" class="text-gray-300 text-xs uppercase">{{ suffix }}</div>
  </div>
</template>

<script>
export default {
  name: "TournamentStatsBlock",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    suffix: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>

</style>