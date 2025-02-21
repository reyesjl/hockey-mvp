// src/router/tournamentRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const tournamentCreate = () => import('@/views/tournaments/TournamentCreate.vue')
const TournamentsIndex = () => import('@/views/tournaments/TournamentsIndex.vue')
const TournamentShow = () => import('@/views/tournaments/TournamentShow.vue')

const tournamentRoutes: Array<RouteRecordRaw> = [
  {
    path: '/tournaments/create',
    name: 'tournament-create',
    component: tournamentCreate,
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: TournamentsIndex,
  },
  {
    path: '/tournaments/:tournamentId',
    name: 'tournament',
    component: TournamentShow,
  },
]

export default tournamentRoutes
