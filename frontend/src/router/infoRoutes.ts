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

// Lazy-loaded components for better performance
const TermsOfUseView = () => import('@/views/info/TermsOfUse.vue')
const PrivacyPolicyView = () => import('@/views/info/PrivacyPolicy.vue')
const BrandGuidelinesView = () => import('@/views/info/BrandGuidelines.vue')
const OtherPoliciesView = () => import('@/views/info/OtherPolicies.vue')
const ReleaseNotesView = () => import('@/views/info/ReleaseNotes.vue')
const UpcomingReleasesView = () => import('@/views/info/UpcomingReleases.vue')

const infoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/info/terms-of-use',
    name: 'termsOfUse',
    component: TermsOfUseView,
  },
  {
    path: '/info/privacy-policy',
    name: 'privacyPolicy',
    component: PrivacyPolicyView,
  },
  {
    path: '/info/brand-guidelines',
    name: 'brandGuidelines',
    component: BrandGuidelinesView,
  },
  {
    path: '/info/other-policies',
    name: 'otherPolicies',
    component: OtherPoliciesView,
  },
  {
    path: '/info/release-notes',
    name: 'releaseNotes',
    component: ReleaseNotesView,
  },
  {
    path: '/info/upcoming-releases',
    name: 'upcomingReleases',
    component: UpcomingReleasesView,
  },
]

export default infoRoutes
