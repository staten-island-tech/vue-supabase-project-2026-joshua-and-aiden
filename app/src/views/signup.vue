<template>
  <p2 @click="router.push('/')"> -RETURN- </p2>
  <div class="signupBox">
  <p1>Create Account</p1>
  <label>Email</label>
  <input v-model="email" type="email" placeholder="Enter Email"/>
  <label>Password</label>
  <input v-model="password" type="password" placeholder="Enter Password"/>

  <button @click.prevent="signUp">Sign Up</button>

  <p v-if="errorMsg">*{{ errorMsg }}</p>

  <p v-if="successMsg">{{ successMsg }}</p>
  </div>
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
    console.log(error) 
    return
  
  } else {
    successMsg.value = 'Sign Up Success. Please Wait.'
	  setTimeout(() => router.push("/"), 2000)
  }
}
</script>

<style>
  .signupBox{
    position: relative;
    height: 400px;
    width: 455px;
    justify-self: center;
    background-color: white;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    padding-top: 30px;
    border-radius: 10px;
  }
  label {
    font-size: 25px;
    font-family: 'inter', sans-serif;
    padding-left: 20px;
    padding-top: 30px;
  }
  input{
    width: 400px;
    border-radius: 5px;
    margin-left: 20px;
    height: 30px;
    margin-top: 10px;
    padding-left: 8px;
  }
  button{
    width: 200px;
    height: 35px;
    font-family: 'inter', sans-serif;
    transform: translate(230px, 50px);
    border-radius: 15px;
    background-color: rgb(37, 38, 93);
    color: white;
    font-weight: 300;
    letter-spacing: 2px;
    cursor: pointer;
    transition: background-color 0.5s ease;
    border-color: transparent;
  }
  button:hover{
    background-color: rgb(0, 225, 180);
    border-color: rgb(18, 20, 78);
  }
  p1{
    font-size: 30px;
    font-family: 'inter', sans-serif;
    margin-left: 20px;
  }
  p{
    font-size: 15px;
    transform: translate(230px, 80px);
  }
  p2{
    color: white;
    position: relative;
    top: 95px;
    left: 140px;
    cursor: pointer;
    transition: color 0.5s ease;
  }
  p2:hover{
    color: rgb(2, 155, 250);
  }
</style>

