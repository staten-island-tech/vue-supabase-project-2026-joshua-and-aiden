import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '../router'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  actions: {
    async init() {
      this.loading = true
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) this.error = error
        this.user = data?.user ?? null
        supabase.auth.onAuthStateChange((_event, session) => {
          this.user = session?.user ?? null
        })
      } finally {
        this.loading = false
      }
    },
    async signIn(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        this.user = data.user
        await router.push('/profiles')
        return data.user
      } catch (err) {
        this.error = err
        throw err
      } finally {
        this.loading = false
      }
    },
async signUp(email, password, username) {
  this.loading = true
  this.error = null
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })
    if (error) throw error
    const user = data.user
    if (!user) throw new Error('Signup failed to return a user')
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, first_name: username }, { onConflict: 'id' })
      .maybeSingle()
    if (profileError) throw profileError
    await supabase.from('scores').upsert({ user_id: user.id, score_balance: 0 }, { onConflict: 'user_id' }).maybeSingle()
    this.user = user
    await router.push('/game')
    return user
  } catch (err) {
    this.error = err
    throw err
  } finally {
    this.loading = false
  }
},
    
  }
})