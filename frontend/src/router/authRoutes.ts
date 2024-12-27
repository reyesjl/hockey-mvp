// src/router/authRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const Signup = () => import('@/views/auth/Signup.vue')
const Login = () => import('@/views/auth/Login.vue')
const Dashboard = () => import('@/views/auth/Dashboard.vue')
const AdminDashboard = () => import('@/views/auth/AdminDashboard.vue')
const EditDisplayName = () => import('@/views/auth/EditDisplayName.vue')
const EditAvatar = () => import('@/views/auth/EditAvatar.vue')

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
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/admin/',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/account/edit-display-name',
    name: 'edit-display-name',
    component: EditDisplayName,
  },
  {
    path: '/account/edit-avatar',
    name: 'edit-avatar',
    component: EditAvatar,
  },
]

export default authRoutes
