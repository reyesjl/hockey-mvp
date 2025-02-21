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

// Tournament Type
type Tournament = {
  _id: string
  name: string
  location: {
    city: string
    state: string
    geo: {
      type: string
      coordinates: number[]
    }
  }
  company: {
    name: string
    email: string
  }
  submitted_by: string
  owner: string | null
  description?: string
  dates: Date[]
  minimum_games: number
  level_of_play: string[]
  age_groups: string[]
  details: {
    usa_sanctioned: boolean
    stay_and_play: boolean
    extended_checkout: boolean
  }
  gender: 'boys' | 'girls' | 'both'
  hardware: {
    first_place?: string
    second_place?: string
  }
  discounts: {
    multi_team: boolean
    early_bird?: string
    other?: string
  }
  ratings: {
    overall: number
    referee: number
    communication: number
    facilities: number
    votes: number
  }
  visible: {
    state: 'pending' | 'approved' | 'rejected'
    reason: string
  }
  createdAt?: string
  updatedAt?: string
}

// Review Type
type Review = {
  _id: string
  tournament: string
  reviewer: string
  ratings: {
    overall: number
    referee: number
    communication: number
    facilities: number
  }
  subject: string
  comment: string
  status: 'visible' | 'hidden' | 'flagged'
  createdAt?: string
  updatedAt?: string
}

export type { Tournament, Review }
