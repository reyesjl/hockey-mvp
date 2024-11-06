<template>
    <header class="bg-black text-white">
        <nav class="navbar z-50 flex justify-between items-center w-[92%] mx-auto p-3">
            <div class="site-logo w-10">
                <RouterLink to="/">
                    <img class="w-16" src="../assets/logoDraft1.3.svg" alt="yht logo" />
                </RouterLink>
            </div>
            <div class="navlist z-40 md:static absolute md:bg-black bg-white md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full flex items-center px-5 md:text-white text-black duration-300"
                :class="{
                    'top-[10%]': isMenuOpen,
                    'top-[-100%]': !isMenuOpen,
                }">
                <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <RouterLink to="/" class="hover:text-gray-500 duration-200" @click="onCloseMenu(this)">Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about" class="hover:text-gray-500 duration-200" @click="onCloseMenu(this)">
                            About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/tournaments" class="hover:text-gray-500 duration-200"
                            @click="onCloseMenu(this)">Tournaments</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/community" class="hover:text-gray-500 duration-200" @click="onCloseMenu(this)">
                            Community</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/support" class="hover:text-gray-500 duration-200" @click="onCloseMenu(this)">
                            Support</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="actions md:hidden block">
                <button @click="onToggleMenu(this)" class="bg-sky-700 px-5 py-2 rounded-full hover:bg-sky-500">
                    {{ isMenuOpen ? 'Close' : 'Menu' }}
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink,
    },
    data() {
        return {
            isMenuOpen: false,
        }
    },
    methods: {
        onToggleMenu(e) {
            this.isMenuOpen = !this.isMenuOpen;
        },
        onCloseMenu(e) {
            this.isMenuOpen = false;
        }
    }
}
</script>

<style scoped></style>
