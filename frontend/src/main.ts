import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

console.log('Initializing firebase...')
import './firebase'
console.log('Initializing firebase...SUCCESS')

console.log('Initializing app...')
const app = createApp(App)
app.use(createPinia())
app.use(router)
console.log('Initializing app...SUCCESS')

console.log('Mounting app...')
app.mount('#app')
console.log('Mounting app...SUCCESS')
