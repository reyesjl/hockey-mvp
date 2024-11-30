<template>
  <div class="container py-10 md:py-20">
    <div class="max-w-2xl mx-auto p-6 rounded-lg bg-white">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Flag a Tournament</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
        <!-- Hidden Tournament ID -->
        <input type="hidden" v-model="flag.tournament" />

        <!-- Submitted By -->
        <div>
          <label for="submittedBy" class="block text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="submittedBy"
            v-model="flag.submittedBy"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <!-- Fields -->
        <div>
          <label for="fields" class="block text-sm font-medium text-gray-700">
            Select Fields to Flag
          </label>
          <select
            id="fields"
            v-model="flag.fields"
            multiple
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          >
            <option v-for="field in validFields" :key="field" :value="field">
              {{ field }}
            </option>
          </select>
          <p class="text-sm text-gray-500 mt-1">
            Hold Ctrl (Cmd on Mac) to select multiple options.
          </p>
        </div>

        <!-- Reason -->
        <div>
          <label for="reason" class="block text-sm font-medium text-gray-700">
            Reason for Flagging
          </label>
          <textarea
            id="reason"
            v-model="flag.reason"
            required
            maxlength="500"
            placeholder="Provide details (max 500 characters)"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Flag
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      flag: {
        tournament: "",
        submittedBy: "",
        fields: [],
        reason: "",
      },
      validFields: ["name", "location", "date", "description"], // Replace with VALID_FIELDS from backend if dynamic
    };
  },
  props: {
    tournamentId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // Initialize tournament ID when component is loaded
    this.flag.tournament = this.tournamentId;
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("/api/v1/flags", this.flag);
        alert("Flag submitted successfully!");
        console.log(response.data);
        // Optionally reset form
        this.flag.fields = [];
        this.flag.reason = "";
      } catch (error) {
        console.error(error.response.data);
        alert("Failed to submit flag. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>