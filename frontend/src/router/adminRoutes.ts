// src/router/adminRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const AdminLayout = () => import('@/layouts/AdminLayout.vue')
const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue')
const AdminSubmissions = () => import('@/views/admin/AdminSubmissionsView.vue')
const AdminTournaments = () => import('@/views/admin/AdminTournamentsView.vue')
const AdminFlags = () => import('@/views/admin/AdminFlagsView.vue')

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/dashboard',
    component: AdminLayout,
    children: [
      {
        path: '/admin',
        name: 'admin',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
      }
    ],
  },
]

export default adminRoutes
