<template>
	<main>
		<!-- Show loading state -->
		<div v-if="isTournamentLoading" class="text-center mt-6">
			<div class="flex justify-center items-center space-x-2">
				<!-- Spinner Icon with Tailwind animation -->
				<i class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"></i>
			</div>
		</div>
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
					<div>
						<div class="text-lg italic"><i class="fa-regular fa-building"></i> {{ tournament.company }}</div>
						<div class="text-sm italic"><i class="fa-solid fa-envelope"></i> {{ tournament.contactEmail }}</div>
					</div>
					<!-- Leave a Review Button -->
					<a class="bg-amber-500 cursor-not-allowed text-white px-4 py-2 rounded-full hover:shadow-lg duration-200 ml-2" href="">
						<i class="fa-solid fa-flag"></i>
					</a>
					<!-- <RouterLink 
						:to="`/reviews/create/${tournamentId}`" 
						class=" bg-gray-500 cursor-not-allowed text-white px-4 py-2 rounded-full duration-200 ml-2">
						<i class="fa-solid fa-flag"></i>
					</RouterLink> -->
				</div>
				<div>
					<p></p>
				</div>
			</div>

			<!-- Button to toggle visibility -->
			<div class="mt-8 cursor-pointer flex justify-end text-sm" @click="showContent = !showContent">
				<div class="flex gap-1 items-center text-white">
					<i v-if="showContent" class="fa-solid fa-eye text-sm"></i>
					<i v-else class="fa-solid fa-eye-slash"></i>
					<span v-if="showContent">Hide</span>
					<span v-else>Show</span> 
				</div>
			</div>

			<!-- Row Container with Games Minimum, Referee Rating, and Communication Rating -->
			<div v-if="showContent" class="mt-3 bg-white text-sm p-3 rounded-lg flex gap-3 overflow-x-auto items-center flex-wrap">
				<!-- Games Minimum Widget -->
				<div class="bg-black text-white py-2 px-3 rounded-full flex items-center gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-hockey-puck"></i> Games Minimum</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.gamesMinimum }}</span>
				</div>

				<!-- Referee Rating Widget -->
				<div class="bg-black text-white py-2 px-3 rounded-full flex gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-person-skating"></i> Referee Rating</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.refereeRating || 'Not available' }}</span>
				</div>

				<!-- Communication Rating Widget -->
				<div class="bg-black text-white py-2 px-3 rounded-full flex gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-bullhorn"></i> Communication Rating</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.tournamentCommunicationRating || 'Not available' }}</span>
				</div>

				<!-- Stay and Play Widget (only show if true) -->
				<div v-if="tournament.stayAndPlay" class="bg-black text-white py-2 px-3 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-bed"></i> Stay and Play</span>
				</div>

				<!-- Extended Checkout Widget (only show if true) -->
				<div v-if="tournament.extendedCheckout" class="bg-black text-white py-2 px-3 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-clock"></i> Extended Checkout</span>
				</div>

				<!-- Multi-Team Discounts Widget (only show if true) -->
				<div v-if="tournament.multiTeamDiscounts" class="bg-black text-white py-2 px-3 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-users"></i> Multi-Team Discounts</span>
				</div>

				<!-- USA Hockey Sanctioned Widget (only show if true) -->
				<div v-if="tournament.usaHockeySanctioned" class="bg-black text-white py-2 px-3 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-flag-usa"></i> USA Hockey Sanctioned</span>
				</div>
			</div>

			<!-- Tournament Information Container -->
			<div v-if="showContent" class="mt-5 bg-white p-6 rounded-lg shadow-lg space-y-6">

				<!-- Tournament Notes -->
				<div>
					<h2 class="font-semibold text-black">Notes</h2>
					<p class="text-gray-700">{{ tournament.notes || 'No additional notes' }}</p>
				</div>

				<!-- Level of Play Widget -->
				<div>
					<h2 class="font-semibold text-black">Level of Play</h2>
					<p class="text-gray-700">{{ tournament.levelOfPlay.join(', ') || 'No level of play specified' }}</p>
				</div>

				<!-- Age Groups Widget -->
				<div>
					<h2 class="font-semibold text-black">Age Groups</h2>
					<p class="text-gray-700">{{ tournament.ageGroups.join(', ') || 'No age groups specified' }}</p>
				</div>

				<!-- Discounts Widget -->
				<div>
					<h2 class="font-semibold text-black">Discounts</h2>
					<p class="text-gray-700">{{ tournament.earlyBirdDiscounts || 'No early bird discounts' }}</p>
					<p class="text-gray-700">{{ tournament.otherDiscounts || 'No other discounts' }}</p>
				</div>

				<!-- Hardware Widget -->
				<div>
					<h2 class="font-semibold text-black">Hardware</h2>
					<p class="text-gray-700">1st Place: {{ tournament.firstPlaceHardware.join(', ') || 'None' }}</p>
					<p class="text-gray-700">2nd Place: {{ tournament.secondPlaceHardware.join(', ') || 'None' }}</p>
				</div>

				<!-- Dates Widget -->
				<div>
					<h2 class="font-semibold text-black">Dates</h2>
					<p class="text-gray-700">{{ formattedDates || 'Dates not available' }}</p>
				</div>

			</div>
		</div>

		<!-- Separator Line -->
		<hr class="my-5 border-gray-700" />

		<!-- Reviews Section -->
		<div v-if="reviews && reviews.length" class="reviews-section px-4 pb-6">
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-2xl text-white">Reviews</h2>
				<RouterLink 
					:to="`/reviews/create/${tournamentId}`" 
					class="bg-black border-solid border-white border-2 text-white px-3 py-1 rounded-full hover:bg-white hover:text-black duration-200 ml-2">
					New Review <i class="fa-solid fa-comments"></i>
				</RouterLink>
			</div>
			
			<!-- Reviews List -->
			<div v-for="review in reviews" :key="review._id" class="flex flex-col">
				<Review :email="review.submittedBy" :rating="review.overallRating" :comment="review.comment" />
			</div>
		</div>
		<div v-else class="flex flex-col text-center gap-4">
			<p class="text-white">No reviews yet. Be the first to leave a review!</p>
			<RouterLink 
				:to="`/reviews/create/${tournamentId}`" 
				class="border-solid border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black duration-200 ml-2">
				New Review <i class="fa-solid fa-comments"></i>
			</RouterLink>
		</div>

		<!-- Optionally, you can display a loading or error message -->
		<div v-else>
			<p class="text-center text-gray-700">Tournament not found or loading...</p>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Review from '../components/Review.vue';

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
	components: {
		Review,
	},
	data() {
		return {
			tournamentId: this.$route.params.tournamentId as string,
			tournament: null as Tournament | null,
			reviews: [] as Review[],
			showContent: true,
			isTournamentLoading: true,
			isReviewsLoading: true,
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
			} finally {
				this.isTournamentLoading = false;
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
			} finally {
				this.isReviewsLoading = false;
			}
		},
	},
});
</script>

<style scoped>

</style>
