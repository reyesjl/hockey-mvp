// src/router/infoRoutes.ts

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
  }
]

export default infoRoutes
