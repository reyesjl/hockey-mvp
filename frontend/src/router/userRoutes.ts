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

import type { RouteRecordRaw } from 'vue-router'

const UserIndex = () => import('@/views/user/UserIndex.vue')
const UserShow = () => import('@/views/user/UserShow.vue')
const EditAvatar = () => import('@/views/user/EditAvatar.vue')

const userRoutes: Array<RouteRecordRaw> = [
    {
        path: '/users',
        name: 'users',
        component: UserIndex,
    },
    {
        path: '/users/:username',
        name: 'user',
        component: UserShow,
    },
    {
        path: '/user/edit-avatar',
        name: 'edit-avatar',
        component: EditAvatar,
        meta: { requiresAuth: true },
    }
]

export default userRoutes