// src/router/tournamentRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const tournamentCreate = () => import('@/views/tournaments/TournamentCreate.vue')
const TournamentsIndex = () => import('@/views/tournaments/TournamentsIndex.vue')
const TournamentShow = () => import('@/views/tournaments/TournamentShow.vue')
const TournamentUpdate = () => import('@/views/tournaments/TournamentUpdate.vue')

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
    path: '/tournaments/:id',
    name: 'tournament',
    component: TournamentShow,
  },
  {
    path: '/tournaments/:id/update',
    name: 'tournament-update',
    component: TournamentUpdate,
  },
]

export default tournamentRoutes
