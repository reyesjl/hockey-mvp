// src/router/adminRoutes.ts

import type { RouteRecordRaw } from 'vue-router'

const AdminLayout = () => import('@/layouts/AdminLayout.vue')
const AdminDashboard = () => import('@/views/admin/AdminDashboardView.vue')
const AdminSubmissions = () => import('@/views/admin/AdminSubmissionsView.vue')
const AdminTournaments = () => import('@/views/admin/AdminTournamentsView.vue')
const AdminFlags = () => import('@/views/admin/AdminFlagsView.vue')

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/dashboard',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'adminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'submissions',
        name: 'adminSubmissions',
        component: AdminSubmissions,
      },
      {
        path: 'tournaments',
        name: 'adminTournaments',
        component: AdminTournaments,
      },
      {
        path: 'flags',
        name: 'adminFlags',
        component: AdminFlags,
      },
    ],
  },
]

export default adminRoutes
