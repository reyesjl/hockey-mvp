// src/router/adminRoutes.ts
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/admin/AdminDashboardView.vue'
import AdminSubmissions from '@/views/admin/AdminSubmissionsView.vue'
import AdminTournaments from '@/views/admin/AdminTournamentsView.vue'
import AdminFlags from '@/views/admin/AdminFlagsView.vue'
import type { RouteRecordRaw } from 'vue-router'

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
