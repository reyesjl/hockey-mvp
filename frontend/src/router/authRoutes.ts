// src/router/authRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const Signup = () => import('@/views/auth/Signup.vue')
const Login = () => import('@/views/auth/Login.vue')
const Account = () => import('@/views/auth/Account.vue')
const EditProfile = () => import('@/views/auth/EditProfile.vue')
const EditAvatar = () => import('@/views/auth/EditAvatar.vue')

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth/signup',
    name: 'signup',
    component: Signup,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/account/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
  },
  {
    path: '/account/edit-avatar',
    name: 'edit-avatar',
    component: EditAvatar,
  }
]

export default authRoutes
