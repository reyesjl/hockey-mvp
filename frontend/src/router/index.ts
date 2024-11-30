import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import CommunityView from '@/views/CommunityView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SupportView from '@/views/SupportView.vue'
import submissionRoutes from './submissionRoutes'
import tournamentRoutes from './tournamentRoutes'
import adminRoutes from './adminRoutes'

const routes: Array<RouteRecordRaw> = [
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
    ...tournamentRoutes,
    ...submissionRoutes,
    ...adminRoutes,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router