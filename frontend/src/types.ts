export interface Tournament {
  _id: string;
  name: string;
  location: string;
  contactEmail: string;
  notes: string;
  company: string;
  overallRating: number;
  refereeRating: number;
  tournamentCommunicationRating: number;
  gamesMinimum: number;
  levelOfPlay: string[];
  ageGroups: string[];
  usaHockeySanctioned: boolean;
  firstPlaceHardware: string[];
  secondPlaceHardware: string[];
  stayAndPlay: boolean;
  extendedCheckout: boolean;
  multiTeamDiscounts: boolean;
  earlyBirdDiscounts: string;
  otherDiscounts: string;
  createdAt: string;
  updatedAt: string;
  dates: string[];
}

export interface Review {
  _id: string;
  tournamentId: string;
  submittedBy: string;
  comment: string;
  parkingNotes: string;
  overallRating: number;
  refereeRating: number;
  communicationRating: number;
  attendedDate: string;
  createdAt: string;
  updatedAt: string;
}