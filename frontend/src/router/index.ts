import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TournamentsView from '../views/TournamentsView.vue'
import TournamentSubmissionView from '../views/TournamentSubmissionsView.vue'
import CommunityView from '@/views/CommunityView.vue'
import SupportView from '@/views/SupportView.vue'
import LoginView from '@/views/LoginView.vue'
import CreateReviewView from '@/views/CreateReviewView.vue'
import TournamentDetailView from '@/views/TournamentDetailView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/tournaments',
            name: 'tournaments',
            component: TournamentsView,
        },
        {
            path: '/tournaments/:tournamentId',
            name: 'tournamentDetail',
            component: TournamentDetailView,
        },
        {
            path: '/tournaments/submit',
            name: 'tournamentSubmission',
            component: TournamentSubmissionView,
        },
        {
            path: '/reviews/create/:tournamentId',
            name: 'leaveReview',
            component: CreateReviewView,
            props: true,
        },
        {
            path: '/community',
            name: 'community',
            component: CommunityView,
        },
        {
            path: '/support',
            name: 'support',
            component: SupportView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
    ],
})

export default router
