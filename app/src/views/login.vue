<template>
  <label>Email</label>
  <input v-model="email" type="email" placeholder="Enter Email"/>
  <label>Password</label>
  <input v-model="password" type="password" placeholder="Enter Password"/>

  <button @click.prevent="signUp">Sign Up</button>
  <p v-if="errorMsg">{{ errorMsg }}</p>

  <p v-if="successMsg">{{ successMsg }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    errorMsg.value = error.message 
    return
  
  } else {
    successMsg.value = 'Sign Up Success'
	setTimeout(() => router.push("/"), 1500)
  }
}
</script>

