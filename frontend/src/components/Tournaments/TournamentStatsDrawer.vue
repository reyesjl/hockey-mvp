<template>
  <div
    class="stats-drawer flex gap-6 overflow-x-auto snap-x snap-mandatory mt-4 py-4 pr-8 pl-4 md:grid md:grid-cols-4 md:overflow-visible md:snap-none"
  >
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="overall"
      :value="tournament.overallRating"
      suffix="out of 5"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="minimum games"
      :value="tournament.gamesMinimum"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="Referee"
      :value="tournament.refereeRating"
      suffix="out of 5"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="Communication"
      :value="tournament.tournamentCommunicationRating"
      suffix="out of 5"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="Stay and Play"
      :value="tournament.stayAndPlay ? 'YES' : 'NO'"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="Extended Checkout"
      :value="tournament.extendedCheckout ? 'YES' : 'NO'"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="Multi-Team Discounts"
      :value="tournament.multiTeamDiscounts ? 'YES' : 'NO'"
    />
    <TournamentStatsBlock
      class="snap-start flex-shrink-0"
      title="USA Hockey Sanctioned"
      :value="tournament.usaHockeySanctioned ? 'YES' : 'NO'"
    />
  </div>
</template>

<script>
import TournamentStatsBlock from '@/components/Tournaments/TournamentStatsBlock.vue'

export default {
  name: 'TournamentStatsDrawer',
  components: {
    TournamentStatsBlock,
  },
  props: {
    tournament: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
