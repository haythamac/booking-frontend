import BookingView from '@/views/BookingView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    {
      name: 'booking',
      path: '/booking',
      component: BookingView,
    },
    {
      name: 'confirmation',
      path: '/confirmation',
      component: ConfirmationView,
    },
  ],
})

export default router
