// src/router/submissionRoutes.ts

import type { RouteRecordRaw } from 'vue-router'
import CreateSubmissionView from '@/views/submissions/CreateSubmission.vue'

const submissionRoutes: Array<RouteRecordRaw> = [
    {
        path: '/submissions/create',
        name: 'createTournamentSubmission',
        component: CreateSubmissionView,
    }
]

export default submissionRoutes