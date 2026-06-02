import { defineStore } from 'pinia';
import { SupabaseClient } from '@supabase/supabase-js';
import router from '../router'
export const useAuthStore = defineStore('auth', {
    state: () => ({
})