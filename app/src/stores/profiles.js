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
        const { data: prof, error: profErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle()
        if (profErr) throw profErr
        const { data: scoreRow, error: scoreErr } = await supabase
          .from('scores')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()
        if (scoreErr) throw scoreErr
        this.profile = {
          ...(prof ?? {}),
          score_balance: scoreRow?.score_balance ?? 0
        }
      } catch (err) {
        this.error = err
        console.error('fetchProfile exception', err)
      } finally {
        this.loading = false
      }
    },
        async updateScore(userId, delta) {
      if (!userId) return
      this.loading = true
      this.error = null
      try {
        const current = Number(this.profile?.score_balance ?? 0)
        const runScore = Number(delta)
        const newScore = Math.max(current, runScore)
        if (newScore === current) {
          return
        }
        const { data: updatedScore, error: upsertErr } = await supabase
          .from('scores')
          .upsert({ user_id: userId, score_balance: newScore }, { onConflict: 'user_id' })
          .select()
          .maybeSingle()
        if (upsertErr) throw upsertErr
        const { error: ledgerErr } = await supabase
          .from('score_ledger')
          .insert([{ user_id: userId, score_balance: newScore }])
        if (ledgerErr) console.warn('ledger insert warning', ledgerErr)
      this.profile = {
      ...(this.profile ?? {}),
      score_balance: updatedScore?.score_balance ?? newScore
      }
      } catch (err) {
        this.error = err
        console.error('updateScore exception', err)
      } finally {
        this.loading = false
      }
    }
  }
})