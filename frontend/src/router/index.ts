import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import CommunityView from '@/views/CommunityView.vue'
import CreateReviewView from '@/views/CreateReviewView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SupportView from '@/views/SupportView.vue'
import TournamentDetailView from '@/views/TournamentDetailView.vue'
import TournamentSubmissionView from '@/views/TournamentSubmissionsView.vue'
import TournamentsView from '@/views/TournamentsView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import AdminSubmissionView from '@/views/AdminSubmissionView.vue'

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
        {
            path: '/admin/dashboard',
            name: 'adminDashboard',
            component: AdminDashboardView,
        },
        {
            path: '/admin/dashboard/submissions',
            name: 'adminSubmissions',
            component: AdminSubmissionView,
        },
    ],
})

export default router
