// src/router/submissionRoutes.ts

import type { RouteRecordRaw } from 'vue-router'
const CreateSubmission = () =>
  import('@/views/submissions/CreateSubmission.vue')

const submissionRoutes: Array<RouteRecordRaw> = [
  {
    path: '/submissions/create',
    name: 'createTournamentSubmission',
    component: CreateSubmission,
  },
]

export default submissionRoutes
