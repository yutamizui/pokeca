import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // ✅ Import HomeView here

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // ✅ Use HomeView here
    },
  ],
})

export default router
