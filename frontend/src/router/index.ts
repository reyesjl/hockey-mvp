/**
 * Youth Hockey Tournaments
 * 
 * Author: Jose Reyes
 * Date: Dec 27, 2025
 * 
 * Copyright © 2025 Jose Reyes. All rights reserved.
 * 
 * This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
 * in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.
 * 
 * This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
 * Any unauthorized use may result in legal action.
 * 
 * For inquiries regarding licensing or permissions, please contact Jose Reyes.
 */

import authRoutes from './authRoutes'
import infoRoutes from './infoRoutes'
import userRoutes from './userRoutes'
import { jwtDecode } from 'jwt-decode'
import reviewRoutes from './reviewRoutes'
import { logout } from '@/services/authService'
import type { RouteRecordRaw } from 'vue-router'
import tournamentRoutes from './tournamentRoutes'
import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Community = () => import('@/views/CommunityView.vue')
const Support = () => import('@/views/SupportView.vue')
const NotFound = () => import('@/views/NotFoundView.vue')
const NotAuthorized = () => import('@/views/NotAuthorizedView.vue')


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
  {
    path: '/not-authorized',
    name: 'not-authorized',
    component: NotAuthorized,
  },
  ...tournamentRoutes,
  ... reviewRoutes,
  ...authRoutes,
  ...infoRoutes,
  ...userRoutes,
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token) as any;
      // temporary fix for avatar
      decodedToken.avatar = authStore.user?.avatar;
      authStore.setUser(decodedToken);
      localStorage.setItem('user', JSON.stringify(decodedToken));
    } catch (error) {
      console.error('Error decoding token:', error);
      authStore.clearUser();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      logout();
    }
  }

  if (requiresAuth && !authStore.user) {
    next({ name: 'login' , query: { next: to.fullPath} });
  } else if (requiresAdmin && !authStore.user?.roles.includes('admin')) {
    next({ name: 'not-authorized' });
  } else {
    next();
  }
});

export default router
