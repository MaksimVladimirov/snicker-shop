import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Favorites from '@/pages/Favorites/Favorites.vue'
import Home from '@/pages/Home/Home.vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
const pinia = createPinia()

app.use(router)
app.use(autoAnimatePlugin)
app.use(pinia)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
