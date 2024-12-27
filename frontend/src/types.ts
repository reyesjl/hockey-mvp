// src/types.ts

// Tournament Type
type Tournament = {
  _id: string
  name: string
  location: string
  dates: Date[]
  contactEmail: string
  notes?: string
  company: string
  overallRating: number
  refereeRating: number
  tournamentCommunicationRating: number
  gamesMinimum: number
  levelOfPlay: string[]
  ageGroups: string[]
  usaHockeySanctioned: boolean
  firstPlaceHardware?: string[]
  secondPlaceHardware?: string[]
  stayAndPlay: boolean
  extendedCheckout: boolean
  multiTeamDiscounts: boolean
  earlyBirdDiscounts?: string
  otherDiscounts?: string
  createdAt?: string
  updatedAt?: string
}

// Review Type
type Review = {
  _id: string
  tournamentId: string
  submittedBy: string
  attendedDate?: Date
  comment: string
  parkingNotes?: string
  overallRating: number
  refereeRating: number
  communicationRating: number
  createdAt?: string
  updatedAt?: string
}

// Flag Type
type Flag = {
  _id: string
  tournament: string // ObjectId reference to Tournament
  submittedBy: string
  fields: string[]
  reason: string
  createdAt?: string
  updatedAt?: string
}

// TournamentSubmission Type
type TournamentSubmission = {
  _id: string
  name: string
  location: string
  dates: Date[]
  contactEmail: string
  notes?: string
  company?: string
  gamesMinimum: number
  levelOfPlay: string[]
  ageGroups: string[]
  approvalStatus: 'pending' | 'approved' | 'denied'
  submittedBy: string
  createdAt?: string
  updatedAt?: string
}

export type { Tournament, Review, Flag, TournamentSubmission }
