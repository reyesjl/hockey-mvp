// src/router/tournamentRoutes.ts

import type { RouteRecordRaw } from 'vue-router'
import TournamentsView from '@/views/tournaments/TournamentsHome.vue'
import TournamentDetailView from '@/views/tournaments/TournamentDetail.vue'
import CreateReviewView from '@/views/tournaments/CreateReview.vue'
import CreateFlagView from '@/views/tournaments/CreateFlag.vue'

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
    }
]

export default tournamentRoutes