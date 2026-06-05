
import { createRouter, createWebHistory } from 'vue-router'
import welcome from '@/views/welcome.vue'
import signup from '@/views/signup.vue'
import profiles from '@/views/profiles.vue'
import login from '@/views/login.vue'
import game from '@/views/game.vue'
import { supabase } from '@/supabase'

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
      component: profiles,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/game',
      name: 'game',
      component: game,
      meta: { requiresAuth: true }
    },
    
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
     return true 
  }

  try {
    const { data } = await supabase.auth.getUser()
    if (data?.user) {
      return true
    }
  } catch (err) {

  }

  return { name: 'login', query: { redirect: to.fullPath } }
})

export default router
