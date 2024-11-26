<template>
	<main>
		<div class="max-w-4xl mx-auto px-4 py-6" v-if="tournament">
			<!-- Tournament Header Section -->
			<div class="bg-gradient-to-b from-sky-300 to-sky-100 py-4 px-3 rounded-xl text-black">
				<div class="flex justify-between items-center mb-6">
					<!-- Location and Rating -->
					<div class="flex justify-between align-middle w-full">
						<p class="py-1 px-2 bg-black text-white rounded-full shadow-lg"><i
								class="fa-solid fa-location-arrow"></i> {{ tournament.location }}</p>
						<p><i class="fa-solid fa-heart"></i> {{ tournament.overallRating }}</p>
					</div>
				</div>

				<!-- Tournament Title -->
				<h1 class="text-3xl font-bold mb-4">{{ tournament.name }}</h1>

				<!-- Company Name and Review Button -->
				<div class="flex justify-between items-end">
					<div>
						<div class="text-lg italic"><i class="fa-regular fa-building"></i> {{ tournament.company }}
						</div>
						<div class="text-sm italic"><i class="fa-solid fa-envelope"></i> {{ tournament.contactEmail }}
						</div>
					</div>
					<!-- Leave a Review Button -->
					<a class="bg-amber-500 cursor-not-allowed text-white px-4 py-2 rounded-full hover:shadow-lg duration-200 ml-2"
						href="">
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
			<div class="mt-4 cursor-pointer flex justify-end text-sm" @click="showContent = !showContent">
				<div class="flex gap-1 items-center text-white">
					<i v-if="showContent" class="fa-solid fa-eye text-sm"></i>
					<i v-else class="fa-solid fa-eye-slash"></i>
					<span v-if="showContent">Hide</span>
					<span v-else>Show</span>
				</div>
			</div>

			<!-- Row Container with Games Minimum, Referee Rating, and Communication Rating -->
			<div v-if="showContent"
				class="mt-3 bg-white text-xs md:text-sm p-3 rounded-lg flex gap-2 overflow-x-auto items-center flex-wrap">
				<!-- Games Minimum Widget -->
				<div class="bg-black text-white py-1 px-2 rounded-full flex items-center gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-hockey-puck"></i> Games Minimum</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.gamesMinimum }}</span>
				</div>

				<!-- Referee Rating Widget -->
				<div class="bg-black text-white py-1 px-2 rounded-full flex gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-person-skating"></i> Referee Rating</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.refereeRating || 'Not available' }}</span>
				</div>

				<!-- Communication Rating Widget -->
				<div class="bg-black text-white py-1 px-2 rounded-full flex gap-2 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-bullhorn"></i> Communication Rating</span>
					<span class="font-semibold whitespace-nowrap">{{ tournament.tournamentCommunicationRating || 'Not available' }}</span>
				</div>

				<!-- Stay and Play Widget (only show if true) -->
				<div v-if="tournament.stayAndPlay"
					class="bg-black text-white py-1 px-2 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-bed"></i> Stay and Play</span>
				</div>

				<!-- Extended Checkout Widget (only show if true) -->
				<div v-if="tournament.extendedCheckout"
					class="bg-black text-white py-1 px-2 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-clock"></i> Extended Checkout</span>
				</div>

				<!-- Multi-Team Discounts Widget (only show if true) -->
				<div v-if="tournament.multiTeamDiscounts"
					class="bg-black text-white py-1 px-2 rounded-full flex items-center gap-3 shadow-lg w-fit">
					<span class="whitespace-nowrap"><i class="fa-solid fa-users"></i> Multi-Team Discounts</span>
				</div>

				<!-- USA Hockey Sanctioned Widget (only show if true) -->
				<div v-if="tournament.usaHockeySanctioned"
					class="bg-black text-white py-1 px-2 rounded-full flex items-center gap-3 shadow-lg w-fit">
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

		<!-- Show loading spinner for tournament and reviews -->
		<div v-if="isTournamentLoading" class="text-center mt-6">
			<div class="flex justify-center items-center space-x-2">
				<i class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"></i>
			</div>
			<p class="text-white">Loading tournament...</p>
		</div>

		<div v-else-if="isReviewsLoading && tournament" class="text-center mt-6">
			<div class="flex justify-center items-center space-x-2">
				<i class="fa-solid fa-spinner animate-spin text-gray-500 text-2xl"></i>
			</div>
			<p class="text-white">Loading reviews...</p>
		</div>

		<!-- Once both tournament and reviews are loaded -->
		<div v-else>
			<!-- Reviews Section -->
			<div v-if="reviews && reviews.length" class="max-w-4xl mx-auto reviews-section px-4 pb-6">
				<div class="flex justify-between items-center mb-8">
					<h2 class="text-2xl text-white">Reviews</h2>
					<RouterLink :to="`/reviews/create/${tournament._id}`"
						class="bg-black border-solid border-white border-2 text-white px-3 py-1 rounded-full hover:bg-white hover:text-black duration-200 ml-2">
						New Review <i class="fa-solid fa-comments"></i>
					</RouterLink>
				</div>

				<!-- Reviews List -->
				<div v-for="review in reviews" :key="review._id" class="flex flex-col">
					<Review :email="review.submittedBy" :rating="review.overallRating" :comment="review.comment" :attendedDate="review.attendedDate"/>
				</div>
			</div>

			<!-- No Reviews Found State -->
			<div v-else class="flex flex-col items-center">
				<p class="mb-4 text-center text-gray-300">No reviews exist yet. Be the first to leave a review!</p>
				<RouterLink :to="`/reviews/create/${tournament._id}`"
					class="mb-4 w-fit border-solid border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black duration-200 ml-2">
					New Review <i class="fa-solid fa-comments"></i>
				</RouterLink>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useTournament } from '../composables/useTournament';
import { useReviews } from '../composables/useReviews';
import { useRoute } from 'vue-router';
import Review from '../components/Review.vue';

export default defineComponent({
	components: {
		Review,
	},
	setup() {
		// Accessing the route params
		const route = useRoute();
		const tournamentId = route.params.tournamentId as string;

		// Detail toggle
		const showContent = ref(true);

		// Using composables
		const { tournament, isTournamentLoading, fetchTournamentById } = useTournament();
		const { reviews, isReviewsLoading, fetchReviewsByTournamentId } = useReviews();

		// Fetch tournament and reviews when the component is mounted
		onMounted(async () => {
			if (tournamentId) {
				await fetchTournamentById(tournamentId);
				await fetchReviewsByTournamentId(tournamentId);
			}
		});

		// Computed property for formatted dates
		const formattedDates = computed(() => {
			return tournament.value?.dates
				? tournament.value.dates
					.map(date => new Date(date).toLocaleDateString('en-US', {
						month: '2-digit',
						day: '2-digit',
						year: 'numeric',
					}))
					.join(', ')
				: null;
		});

		return {
			tournament,
			isTournamentLoading,
			reviews,
			isReviewsLoading,
			formattedDates,
			showContent
		};
	},
});
</script>

<style scoped></style>
