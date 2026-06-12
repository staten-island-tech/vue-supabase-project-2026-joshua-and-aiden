import { createRouter, createWebHistory } from 'vue-router'
import welcome from '@/views/welcome.vue'
import signup from '@/views/signup.vue'
import profiles from '@/views/profiles.vue'
import login from '@/views/login.vue'
import game from '@/views/game.vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/auth'
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
    },
    {
      path: '/game',
      name: 'game',
      component: game,
      meta: { requiresAuth: true }
    },
    
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (!auth.user && !auth.loading) await auth.init()
  if (to.meta?.requiresAuth && !auth.user) {
    return next({ name: 'login' })
  }
  next()
})

export default router
