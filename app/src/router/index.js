import { createRouter, createWebHistory } from 'vue-router'
import welcome from '@/views/welcome.vue'
import login from '@/views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ],
})

export default router
