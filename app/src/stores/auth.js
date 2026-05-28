import { defineStore } from 'pinia'
import { supabase } from '../supabase'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
        error: null
    }),
    actions: {
        async signIn(email, password) {
            this.loading = true
            this.error = null
            try {
                const { data, error } =
                    await supabase.auth.signInWithPassword({
                        email,
                        password
                    })
                if (error) throw error
                this.user = data.user
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        async signOut() {
            await supabase.auth.signOut()
            this.user = null
        }
    }
})