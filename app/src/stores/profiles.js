import { defineStore } from 'pinia'
<<<<<<< HEAD
import { supabase } from 
=======
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useProfileStore = defineStore('profile', () => {
	const profile = ref(null)

	async function fetchProfile(id) {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', id)
				.single()
			if (error) throw error
			profile.value = data
		} catch (err) {
			console.error('fetchProfile error', err)
			profile.value = null
		}
	}

	return { profile, fetchProfile }
})
>>>>>>> main
