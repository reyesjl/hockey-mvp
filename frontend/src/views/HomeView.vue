<script setup lang="ts">

</script>

<template>
    <main class="container">
        <div class="w-auto mx-auto">
            <div class="mt-5 mb-10 flex flex-col items-center text-center min-h-[80vh] justify-evenly">
                <div>
                    <p class="pb-2">YHT Reviews Beta</p>
                    <h1 class="md:pb-10 pb-5 text-4xl md:text-5xl font-semibold">Plan. Play. <br />Review & Connect.
                    </h1>
                </div>
                <img class="md:pb-10 pb-5 object-fit rounded-full" src="../assets/celebrate.webp"
                    alt="hockey team celebration gif" />
                
                <p class="md:w-1/2 mx-auto md:text-xl text-gray-400">Explore hockey-specific reviews on hotels,
                    restaurants, rinks, and activities so your team’s experience is as smooth off the ice as it is on.
                    Whether you’re looking to discover or review, your journey starts here.</p>

                <div class="flex flex-row gap-5 pt-5">
                    <RouterLink to="/tournaments"
                        class="md:px-5 px-3 md:py-2 py-1  bg-black text-white border-solid border-2 border-white hover:bg-white hover:text-black rounded-full duration-200">
                        Tournaments</RouterLink>
                    <RouterLink to="/about" class="bg-gray-700 md:px-5 px-3 md:py-2 py-1 rounded-full hover:bg-gray-500 duration-200">
                        Learn More</RouterLink>
                </div>
                
            </div>
        </div>
    </main>
</template>

<style scoped></style>
