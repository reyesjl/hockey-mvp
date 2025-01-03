import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import submissionRoutes from './submissionRoutes'
import tournamentRoutes from './tournamentRoutes'
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
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  // console.log(`Navigating to: ${to.fullPath}`)
  // console.log(`From: ${from.fullPath}`)
  // console.log(`Requires Auth: ${requiresAuth}`)
  // console.log(`Requires Admin: ${requiresAdmin}`)
  // console.log(`User is logged in: ${userStore.isLoggedIn}`)
  // console.log(`User is admin: ${userStore.isAdmin}`)

  if (requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login' })
  } else if (requiresAdmin) {
    if (userStore.isAdmin) {
      next()
    } else {
      next({ name: 'dashboard' })
    }
  } else {
    next()
  }
})

export default router
