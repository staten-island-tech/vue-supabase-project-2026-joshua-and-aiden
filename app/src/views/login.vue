<<<<<<< HEAD
<template>
    <div class="loginPage">
        <h3>Log In</h3>
        <p>Username</p>
        <input class="usernameBox" type="text" v-model="username" placeholder="Enter Username">

        <p>Password</p>
        <input class="passwordBox" type="text" v-model="password" placeholder="Enter Password">
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const username = ref('');
    const password = ref('');
</script>

<style scoped>
    .loginPage{
        height: 500px;
        width: 450px;
        background-color: white;
        justify-self: center;
        text-align: left;
        box-sizing: border-box;
        padding: 10px;
    }
    h3{
        color: black;
        font-size: 45px;
        font-family: Georgia;
        
    }
    p{
        color: black;
        font-size: 25px;
        
    }
    .usernameBox{
        position: relative;
        top: -50px;
        height: 20px;
        width: 300px;
    }
    .passwordBox{
        position: relative;
        top: -50px;
        height: 20px;
        width: 300px;
    }
</style>
=======
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
>>>>>>> main
