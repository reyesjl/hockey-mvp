// src/router/authRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const Signup = () => import('@/views/auth/Signup.vue')
const Login = () => import('@/views/auth/Login.vue')

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
  },
]

export default authRoutes
