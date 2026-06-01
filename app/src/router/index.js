import { createRouter, createWebHistory } from 'vue-router'
import welcome from '@/views/welcome.vue'
import signup from '@/views/signup.vue'
import profiles from '@/views/profiles.vue'
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
      path: '/signup',
      name: 'signup',
      component: signup
    },
      {
      path: '/profiles',
      name: 'profiles',
      component: profiles
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ],
})

export default router
