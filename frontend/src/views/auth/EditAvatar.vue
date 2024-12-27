<template>
  <main class="pt-[3.125rem]">
    <div
      class="w-full bg-fixed min-h-screen overflow-auto bg-gradient-to-b from-blue-200 to-blue-100"
    >
      <div class="container">
        <div
          class="my-10 md:my-16 mx-auto p-8 h-fit max-w-3xl rounded-xl shadow-xl bg-gradient-to-b from-sky-200 to-white"
        >
          <div class="flex justify-center mb-6">
            <i
              class="fa-solid fa-user text-black p-4 aspect-square bg-white rounded-xl shadow-xl"
            ></i>
          </div>
          <div class="mb-6 flex flex-col gap-2">
            <h2 class="font-semibold text-xl md:text-2xl text-center">
              Choose Your Avatar
            </h2>
          </div>

          <!-- Current Avatar Preview -->
          <div class="mb-8 flex justify-center">
            <div
              class="w-24 h-24 rounded-full overflow-hidden border-4 border-sky-500"
            >
              <img
                :src="user?.photoURL || 'https://robohash.org/default'"
                alt="Current Avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Avatar Grid -->
          <div class="overflow-auto snap-y snap-mandatory max-h-[60vh]">
            <div class="grid grid-cols-3 md:grid-cols-5 gap-4 p-2">
              <div
                v-for="team in nhlTeams"
                :key="team.team"
                @click="handleUpdateAvatar(team.gifUrl)"
                class="aspect-square cursor-pointer transition-transform hover:scale-110"
              >
                <img
                  :src="team.gifUrl"
                  :alt="team.team"
                  class="w-full h-full rounded-full object-cover shadow-lg snap-center"
                />
              </div>
            </div>
          </div>

          <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
            {{ error }}
          </p>
          <p v-if="success" class="text-green-500 text-sm mt-4 text-center">
            {{ success }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { nhlTeams } from '@/data/nhlTeams'

const userStore = useUserStore()
const router = useRouter()
const error = ref('')
const success = ref('')

const user = computed(() => userStore.user)

const handleUpdateAvatar = async (photoURL: string) => {
  error.value = ''
  success.value = ''

  try {
    if (user.value) {
      await updateProfile(user.value, { photoURL })
      success.value = 'Avatar updated successfully'
      setTimeout(() => {
        router.push({ name: 'dashboard' })
      }, 1000)
    }
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<style scoped>
/* Custom scrollbar styling */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
