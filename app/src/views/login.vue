<template>
	<div class="login-container">
		<h1>Login</h1>

		<form @submit.prevent="handleLogin" class="form">
			<label>
				Email
				<input type="email" v-model="email" required />
			</label>

			<label>
				Password
				<input type="password" v-model="password" required minlength="6" />
			</label>

			<div class="actions">
				<button type="submit" :disabled="loading">{{ loading ? 'Signing in...' : 'Log in' }}</button>
				<button type="button" @click="handleSignUp" :disabled="loading">Create account</button>
			</div>

			<p class="error" v-if="error">{{ error }}</p>
			<p class="info" v-if="info">{{ info }}</p>
		</form>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profiles'

const router = useRouter()
const auth = useAuthStore()
const profileStore = useProfileStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const info = ref(null)

watch(() => auth.loading, (v) => (loading.value = v))

async function handleLogin() {
	error.value = null
	info.value = null
	loading.value = true
	try {
		await auth.signIn(email.value, password.value)
		if (auth.error) throw new Error(auth.error)
		if (auth.user) {
			await profileStore.fetchProfile(auth.user.id)
			router.push({ name: 'profiles' })
		} else {
			info.value = 'Signed in — no user object returned. Check your Supabase console.'
		}
	} catch (err) {
		error.value = err.message || String(err)
	} finally {
		loading.value = false
	}
}

async function handleSignUp() {
	error.value = null
	info.value = null
	loading.value = true
	try {
		const { data, error: supError } = await supabase.auth.signUp({
			email: email.value,
			password: password.value,
		})
		if (supError) throw supError
		if (data?.user) {
			const user = data.user
			const { error: insertErr } = await supabase.from('profiles').insert({
				id: user.id,
				email: user.email,
			})
			if (insertErr) throw insertErr
			info.value = 'Account created. You are signed in.'
			await profileStore.fetchProfile(user.id)
			router.push({ name: 'profiles' })
		} else {
			info.value = 'Check your email to confirm sign-up (if required by your Supabase settings).'
		}
	} catch (err) {
		error.value = err.message || String(err)
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.login-container {
	max-width: 420px;
	margin: 3rem auto;
	padding: 1.5rem;
	border: 1px solid #eee;
	border-radius: 8px;
	box-shadow: 0 4px 18px rgba(0,0,0,0.03);
}
.form label {
	display: block;
	margin-bottom: 0.75rem;
}
.form input {
	width: 100%;
	padding: 0.5rem;
	margin-top: 0.25rem;
	box-sizing: border-box;
}
.actions {
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
}
.actions button { flex: 1 }
.error { color: #b00020; margin-top: 0.75rem }
.info { color: #055160; margin-top: 0.75rem }
</style>

