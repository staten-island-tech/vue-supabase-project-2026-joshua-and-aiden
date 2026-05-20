import { createRouter, createWebHistory } from 'vue-router'
import welcome from '@/views/welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    }
  ],
})

export default router
