<template>
	<div class="max-w-4xl mx-auto px-4 py-6" v-if="tournament">
		<!-- Tournament Header Section -->
		<div class="bg-gradient-to-b from-sky-300 to-sky-100 py-4 px-3 rounded-xl text-black">
			<div class="flex justify-between items-center mb-6">
				<!-- Location and Rating -->
				<div class="flex justify-between align-middle w-full">
					<p class="py-1 px-2 bg-black text-white rounded-full shadow-lg"><i class="fa-solid fa-location-arrow"></i> {{ tournament.location }}</p>
					<p><i class="fa-solid fa-heart"></i> {{ tournament.overallRating }}</p>
				</div>
			</div>

			<!-- Tournament Title -->
			<h1 class="text-3xl font-bold mb-4">{{ tournament.name }}</h1>

			<!-- Company Name and Review Button -->
			<div class="flex justify-between items-end">
				<p class="text-lg italic"><i class="fa-regular fa-building"></i> {{ tournament.company }}</p>
				<!-- Leave a Review Button -->
				<a class="bg-gray-500 cursor-not-allowed text-white px-4 py-2 rounded-full duration-200 ml-2" href="">
				<i class="fa-solid fa-flag"></i>
				</a>
				<!-- <RouterLink 
					:to="`/reviews/create/${tournamentId}`" 
					class=" bg-gray-500 cursor-not-allowed text-white px-4 py-2 rounded-full duration-200 ml-2">
					<i class="fa-solid fa-flag"></i>
				</RouterLink> -->
			</div>
		</div>

		<!-- Tournament Information Collapsible Section -->
		<div class="w-full mx-auto mt-10">
			<!-- Toggle Button -->
			<button @click="toggleCollapse"
				class="flex justify-between items-center w-full px-4 py-2 text-left text-white font-semibold rounded-t-lg hover:bg-white hover:text-black focus:outline-none">
				<span>Tournament Information</span>
				<svg :class="{'rotate-180': !collapsed}" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor"
					viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			</button>

			<!-- Collapsible Content -->
			<div v-show="!collapsed" class="p-4 bg-white border border-gray-300 rounded-b-lg space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div>
						<h2 class="font-semibold text-black">Games Minimum</h2>
						<p class="text-gray-700">{{ tournament.gamesMinimum }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Level of Play</h2>
						<p class="text-gray-700">{{ tournament.levelOfPlay.join(', ') }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Age Groups</h2>
						<p class="text-gray-700">{{ tournament.ageGroups.join(', ') }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Contact Email</h2>
						<p class="text-gray-700">{{ tournament.contactEmail }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Notes</h2>
						<p class="text-gray-700">{{ tournament.notes || 'No additional notes' }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Discounts</h2>
						<p class="text-gray-700">{{ tournament.earlyBirdDiscounts || 'No early bird discounts' }}</p>
						<p class="text-gray-700">{{ tournament.otherDiscounts || 'No other discounts' }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Hardware</h2>
						<p class="text-gray-700">1st Place: {{ tournament.firstPlaceHardware.join(', ') || 'None' }}</p>
						<p class="text-gray-700">2nd Place: {{ tournament.secondPlaceHardware.join(', ') || 'None' }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Referee Rating</h2>
						<p class="text-gray-700">{{ tournament.refereeRating || 'Not available' }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Communication Rating</h2>
						<p class="text-gray-700">{{ tournament.tournamentCommunicationRating || 'Not available' }}</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Additional Info</h2>
						<p class="text-gray-700">
							Stay and Play: {{ tournament.stayAndPlay ? 'Yes' : 'No' }}<br>
							Extended Checkout: {{ tournament.extendedCheckout ? 'Yes' : 'No' }}<br>
							Multi-Team Discounts: {{ tournament.multiTeamDiscounts ? 'Yes' : 'No' }}<br>
							USA Hockey Sanctioned: {{ tournament.usaHockeySanctioned ? 'Yes' : 'No' }}
						</p>
					</div>
					<div>
						<h2 class="font-semibold text-black">Dates</h2>
						<p class="text-gray-700">{{ formattedDates || 'Dates not available' }}</p>
					</div>
				</div>
			</div>

		</div>

		<!-- Separator Line -->
		<hr class="my-8 border-gray-700" />

		<!-- Reviews Section -->
		<div v-if="reviews && reviews.length" class="reviews-section space-y-6">
			<div class="flex justify-between align-middle">
				<h2 class="text-2xl font-semibold text-white">Reviews</h2>
				<RouterLink 
					:to="`/reviews/create/${tournamentId}`" 
					class="bg-sky-700 text-white px-4 py-2 rounded-full hover:bg-sky-500 duration-200 ml-2">
					New Review <i class="fa-solid fa-comments"></i>
				</RouterLink>
			</div>
			
			<!-- Reviews List -->
			<div v-for="review in reviews" :key="review._id" class="flex flex-col bg-gray-800 p-4 rounded-lg space-y-2">
				<!-- User Email and Rating -->
				<div class="flex justify-between items-center">
					<p class="text-gray-300 font-semibold">{{ review.submittedBy }}</p>
					<p class="text-white font-semibold">{{ review.overallRating }} <i class="fa-solid fa-star"></i></p>
				</div>

				<!-- Review Text -->
				<p class="text-gray-400">{{ review.comment }}</p>
			</div>
		</div>
		<div v-else class="flex flex-col text-center gap-4">
			<p>No reviews yet. Be the first to leave a review!</p>
			<RouterLink 
				:to="`/reviews/create/${tournamentId}`" 
				class="bg-sky-700 text-white px-4 py-2 rounded-full hover:bg-sky-500 duration-200 ml-2">
				New Review <i class="fa-solid fa-comments"></i>
			</RouterLink>
		</div>
	</div>

	<!-- Optionally, you can display a loading or error message -->
	<div v-else>
		<p class="text-center text-gray-700">Tournament not found or loading...</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Tournament {
	name: string;
	location: string;
	dates: string[];
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
}

interface Review {
	_id: string;
	submittedBy: string;
	comment: string;
	overallRating: number;
}

export default defineComponent({
	data() {
		return {
			tournamentId: this.$route.params.tournamentId as string,
			tournament: null as Tournament | null,
			reviews: [] as Review[],
			collapsed: false,
		};
	},
	computed: {
		formattedDates(): string | null {
			return this.tournament?.dates
				? this.tournament.dates
					.map(date => new Date(date).toLocaleDateString('en-US', {
						month: '2-digit',
						day: '2-digit',
						year: 'numeric',
					}))
					.join(', ')
				: null;
		},
	},
	async mounted() {
		// Fetch the tournament details when the component is mounted
		if (this.tournamentId) {
			await this.fetchTournamentById(this.tournamentId);
			await this.fetchTournamentReviews(this.tournamentId);
		}
	},
	methods: {
		async fetchTournamentById(tournamentId: string) {
			try {
				const response = await fetch(`http://localhost:5000/api/v1/tournaments/${tournamentId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch tournament details.');
				}
				const data = await response.json();
				this.tournament = data;
			} catch (error) {
				console.error('Error fetching tournament:', error);
				// Set tournament to null if error occurs
				this.tournament = null;
			}
		},
		async fetchTournamentReviews(tournamentId: string) {
			try {
				const response = await fetch(`http://localhost:5000/api/v1/reviews?tournamentId=${tournamentId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch reviews.');
				}
				const data = await response.json();
				this.reviews = data;
			} catch (error) {
				console.error('Error fetching reviews:', error);
				this.reviews = [];
			}
		},
		toggleCollapse() {
			this.collapsed = !this.collapsed;
		},
	},
});
</script>

<style scoped>
/* Additional custom styling can go here */
</style>
