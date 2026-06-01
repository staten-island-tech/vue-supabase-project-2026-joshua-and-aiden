import { defineStore } from 'pinia'
import { supabase } from '../supabase'
export const useProfileStore = defineStore('profiles', {
  state: () => ({
    profile: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchProfile(userId) {
      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .select('*')
          .eq('id', userId)
          .single()
        if (error) {
          this.error = error
          console.error('fetchProfile error', error)
          return
        }
        this.profile = data
         if (!data) {
          this.profile = null
          this.error = { message: 'Profile not found' }
          return
        }
        this.profile = data
      } catch (err) {
        this.error = err
        console.error('fetchProfile exception', err)
      } finally {
        this.loading = false
      }
    }
  }
})