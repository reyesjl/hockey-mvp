// src/router/tournamentRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const TournamentsView = () => import('@/views/tournaments/TournamentsHome.vue')
const TournamentDetailView = () =>
  import('@/views/tournaments/TournamentDetail.vue')
const CreateReviewView = () => import('@/views/tournaments/CreateReview.vue')
const CreateFlagView = () => import('@/views/tournaments/CreateFlag.vue')

const tournamentRoutes: Array<RouteRecordRaw> = [
  {
    path: '/tournaments',
    name: 'tournaments',
    component: TournamentsView,
  },
  {
    path: '/tournaments/:tournamentId',
    name: 'tournamentDetail',
    component: TournamentDetailView,
    props: true,
  },
  {
    path: '/tournaments/:tournamentId/reviews/create',
    name: 'createTournamentReview',
    component: CreateReviewView,
    props: true,
  },
  {
    path: '/tournaments/:tournamentId/flags/create',
    name: 'createTournamentFlag',
    component: CreateFlagView,
    props: true,
  },
]

export default tournamentRoutes
