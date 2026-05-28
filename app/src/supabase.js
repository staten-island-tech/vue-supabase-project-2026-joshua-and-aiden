import { createClient } from '@supabase/supabase-js'

// Expects Vite env variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)
