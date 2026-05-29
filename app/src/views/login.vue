<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref(null)

async function handleLogin() {
  errorMsg.value = null
  loading.value = true

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
    return
  }
  router.push({ name: 'welcome' })
  loading.value = false
}
</script>

<template>
  <div class="login">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" autocomplete="email" required />
      </div>

      <div>
        <label>Password</label>
        <input v-model="password" type="password" autocomplete="current-password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="errorMsg" style="color: red">{{ errorMsg }}</p>
    </form>
  </div>
</template>
