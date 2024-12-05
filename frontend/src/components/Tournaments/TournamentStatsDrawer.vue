<template>
  <div
    class="stats-drawer flex gap-6 overflow-x-scroll mt-4 py-4 pr-8 pl-4 md:grid md:grid-cols-4 md:overflow-visible"
  >
    <TournamentStatsBlock title="overall" :value="tournament.overallRating" suffix="out of 5" />
    <TournamentStatsBlock title="minimum games" :value="tournament.gamesMinimum" />
    <TournamentStatsBlock title="Referee" :value="tournament.refereeRating" suffix="out of 5" />
    <TournamentStatsBlock title="Communication" :value="tournament.tournamentCommunicationRating" suffix="out of 5" />
    <TournamentStatsBlock title="Stay and Play" :value="tournament.stayAndPlay ? 'YES' : 'NO'" />
    <TournamentStatsBlock title="Extended Checkout" :value="tournament.extendedCheckout ? 'YES' : 'NO'" />
    <TournamentStatsBlock title="Multi-Team Discounts" :value="tournament.multiTeamDiscounts ? 'YES' : 'NO'" />
    <TournamentStatsBlock title="USA Hockey Sanctioned" :value="tournament.usaHockeySanctioned ? 'YES' : 'NO'" />
  </div>
</template>

<script>
import TournamentStatsBlock from "@/components/Tournaments/TournamentStatsBlock.vue";

export default {
  name: "TournamentStatsDrawer",
  components: {
    TournamentStatsBlock,
  },
  props: {
    tournament: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>