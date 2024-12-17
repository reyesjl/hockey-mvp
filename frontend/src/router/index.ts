import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import submissionRoutes from './submissionRoutes'
import tournamentRoutes from './tournamentRoutes'
import adminRoutes from './adminRoutes'
import authRoutes from './authRoutes'
import infoRoutes from './infoRoutes'

const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Community = () => import('@/views/CommunityView.vue')
const Support = () => import('@/views/SupportView.vue')
const NotFound = () => import('@/views/NotFoundView.vue')

import { useUserStore } from '@/stores/userStore'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/community',
    name: 'community',
    component: Community,
  },
  {
    path: '/support',
    name: 'support',
    component: Support,
  },
  ...tournamentRoutes,
  ...submissionRoutes,
  ...authRoutes,
  ...adminRoutes,
  ...infoRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !userStore.user) {
    next({ name: 'login' }) // Redirect to Login if not authenticated
  } else {
    next()
  }
})

export default router
