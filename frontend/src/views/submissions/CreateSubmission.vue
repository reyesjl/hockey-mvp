<template>
  <main class="pt-[3.125rem]">
    <!-- Full background -->
    <div
      class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100"
    >
      <!-- Invisible form wrapper -->
      <div class="container">
        <!-- Actual form element -->
        <form
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-md rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
          @submit.prevent="handleSubmit"
        >
          <!-- Form logo -->
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-hockey-puck text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
            ></i>
          </div>

          <!-- Form header -->
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Submit a Tournament
            </h2>
            <p class="text-sm text-slate-500 text-center text-balance">
              Add a new tournament to our directory. Once approved, it will be
              visible on our platform.
            </p>
          </div>

          <!-- Form fields -->
          <div class="mb-8">
            <!-- Tournament Name -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Tournament Name</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-tag"></i>
                </span>
                <input
                  v-model="name"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Tournament Name"
                  type="text"
                  name="name"
                />
              </label>
              <p v-if="errors.name" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.name }}
              </p>
            </div>

            <!-- Company -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Company</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-building"></i>
                </span>
                <input
                  v-model="company"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Tournament Company"
                  type="text"
                  name="company"
                />
              </label>
              <p v-if="errors.company" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.company }}
              </p>
            </div>

            <!-- Contact Email -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Tournament contact email</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-envelope"></i>
                </span>
                <input
                  v-model="contactEmail"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Tournament Contact Email"
                  type="email"
                  name="contactEmail"
                />
              </label>
              <p
                v-if="errors.contactEmail"
                class="text-red-500 text-sm mt-1 mb-1"
              >
                {{ errors.contactEmail }}
              </p>
            </div>

            <!-- Location -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Location</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-location-dot"></i>
                </span>
                <input
                  v-model="location"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Location (e.g. Richmond, VA)"
                  type="text"
                  name="location"
                />
              </label>
              <p v-if="errors.location" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.location }}
              </p>
            </div>

            <!-- Dates -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Dates</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-calendar-days"></i>
                </span>
                <input
                  v-model="date"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  type="date"
                  name="dates"
                  @change="addDate"
                />
              </label>
              <p v-if="errors.dates" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.dates }}
              </p>
            </div>

            <!-- User added dates -->
            <div class="mb-3">
              <span class="text-gray-500">Dates</span>
              <ul class="mb-3">
                <li
                  v-for="(date, index) in dates"
                  :key="index"
                  class="text-gray-500 flex justify-between items-center"
                >
                  {{ date }}
                  <i
                    class="text-red-500 hover:text-red-800 duration-300 fa-regular fa-circle-xmark cursor-pointer"
                    @click="removeDate(index)"
                  ></i>
                </li>
              </ul>
            </div>

            <!-- Games Minimum -->
            <div class="mb-3">
              <label class="relative block">
                <span class="sr-only">Minimum Games</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <i class="text-slate-400 fa-solid fa-hashtag"></i>
                </span>
                <input
                  v-model="gamesMinimum"
                  class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Minimum Games"
                  type="number"
                  name="gamesMinimum"
                  min="1"
                />
              </label>
              <p
                v-if="errors.gamesMinimum"
                class="text-red-500 text-sm mt-1 mb-1"
              >
                {{ errors.gamesMinimum }}
              </p>
            </div>

            <!-- Notes -->
            <label class="relative block mb-3">
              <span class="sr-only">Notes</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="text-slate-400 fa-solid fa-note-sticky"></i>
              </span>
              <textarea
                v-model="notes"
                class="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Notes"
                name="notes"
              ></textarea>
            </label>

            <!-- Level of Play -->
            <div class="mb-3 text-sm">
              <span class="text-gray-500">Level of Play</span>
              <div class="text-gray-500 flex flex-wrap gap-2">
                <label
                  v-for="level in VALID_LEVELS_OF_PLAY"
                  :key="level"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="level"
                    v-model="levelOfPlay"
                    class="mr-2"
                  />
                  {{ level }}
                </label>
              </div>
              <p
                v-if="errors.levelOfPlay"
                class="text-red-500 text-sm mt-1 mb-1"
              >
                {{ errors.levelOfPlay }}
              </p>
            </div>

            <!-- Age Groups -->
            <div class="mb-3 text-sm">
              <span class="text-gray-500">Age Groups</span>
              <div class="text-gray-500 flex flex-wrap gap-2">
                <label
                  v-for="age in VALID_AGE_GROUPS"
                  :key="age"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="age"
                    v-model="ageGroups"
                    class="mr-2"
                  />
                  {{ age }}
                </label>
              </div>
              <p v-if="errors.ageGroups" class="text-red-500 text-sm mt-1 mb-1">
                {{ errors.ageGroups }}
              </p>
            </div>
          </div>

          <div class="flex">
            <BaseButton
              type="submit"
              label="Submit Tournament"
              class="w-full shadow-xl"
              :disabled="isLoading"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm mt-4">
            {{ success }}
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseButton from '@/lib/ui/BaseButton.vue'
import { createTournamentSubmission } from '@/services/submissions'
import * as yup from 'yup'

const VALID_AGE_GROUPS = [
  '8U',
  '10U',
  '12U',
  '14U',
  '16U',
  '18U',
  'Midget',
  'Junior',
  'Varsity',
  'Adult/Rec',
]
const VALID_LEVELS_OF_PLAY = ['AAA', 'AA', 'A', 'B', 'C/Rec/House']

const name = ref('')
const location = ref('')
const date = ref('')
const dates = ref<string[]>([])
const contactEmail = ref('')
const gamesMinimum = ref<number | null>(null)
const notes = ref('')
const company = ref('')
const levelOfPlay = ref<string[]>([])
const ageGroups = ref<string[]>([])
const error = ref('')
const success = ref('')
const isLoading = ref(false)
const errors = ref<{ [key: string]: string }>({})

const userStore = useUserStore()

const addDate = async () => {
  if (date.value) {
    const selectedDate = new Date(date.value)
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    if (selectedDate <= now) {
      errors.value.dates = 'Selected date must be in the future'
      return
    }

    dates.value.push(date.value)
    date.value = ''
    await validateForm()
  }
}

const removeDate = async (index: number) => {
  dates.value.splice(index, 1)
  await validateForm()
}

const schema = yup.object().shape({
  name: yup.string().required('Tournament name is required'),
  location: yup.string().required('Location is required'),
  contactEmail: yup
    .string()
    .email('Invalid email')
    .required('Contact email is required'),
  gamesMinimum: yup
    .number()
    .min(1, 'Minimum games must be at least 1')
    .required('Minimum games is required'),
  dates: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one date is required'),
  levelOfPlay: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one level of play is required'),
  ageGroups: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one age group is required'),
})

const validateForm = async (): Promise<boolean> => {
  try {
    await schema.validate(
      {
        name: name.value,
        location: location.value,
        contactEmail: contactEmail.value,
        gamesMinimum: gamesMinimum.value,
        dates: dates.value,
        levelOfPlay: levelOfPlay.value,
        ageGroups: ageGroups.value,
      },
      { abortEarly: false },
    )
    errors.value = {}
    return true
  } catch (err: any) {
    errors.value = err.inner.reduce((acc: any, curr: any) => {
      acc[curr.path] = curr.message
      return acc
    }, {})
    return false
  }
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  if (!(await validateForm())) {
    isLoading.value = false
    return
  }

  try {
    const userUid = userStore.user?.uid
    if (!userUid) {
      throw new Error('User is not authenticated')
    }

    const newSubmission = {
      name: name.value,
      location: location.value,
      dates: dates.value,
      contactEmail: contactEmail.value,
      gamesMinimum: gamesMinimum.value,
      notes: notes.value,
      company: company.value,
      levelOfPlay: levelOfPlay.value,
      ageGroups: ageGroups.value,
      userUid,
    }

    const response = await createTournamentSubmission(newSubmission)

    if (response.success) {
      success.value = 'Tournament submitted successfully!'
    } else {
      error.value = response.message
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
