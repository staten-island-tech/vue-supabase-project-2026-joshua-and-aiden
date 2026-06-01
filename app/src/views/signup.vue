<template>
  <p2 @click="returnback"> -RETURN- </p2>
  <div class="signupBox">
  <p1>Create Account</p1>
  <label>Email</label>
  <input v-model="email" type="email" placeholder="Enter Email"/>
  <label>Password</label>
  <input v-model="password" type="password" placeholder="Enter Password"/>

  <button @click.prevent;="signUp(); popUp()">Sign Up</button>

  <p v-if="errorMsg" class="formErrorMsg">*{{ errorMsg }}</p>

  <p v-if="successMsg" class="formSuccess">{{ successMsg }}</p>

  <p v-if="errMsgTellingUToFillForm" class="formErrorMsg">*{{ errMsgTellingUToFillForm }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
import { email, password, errorMsg, successMsg, errMsgTellingUToFillForm } from '../stores/loginsignup'

const router = useRouter()

function returnback() {
    router.push('/');
    errorMsg.value = '';
    successMsg.value = '';
    errMsgTellingUToFillForm.value = '';
    email.value = '';
    password.value = '';
}

function popUp() {
  if(email.value === '' || password.value === '') {
    errMsgTellingUToFillForm.value = 'Please Fill Out All Forms.'
    errorMsg.value = '';
    return false
  } else {
    errMsgTellingUToFillForm.value = '';
    return true
  }
}

const signUp = async () => {

  if (popUp() === false) {
    return
  }

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    errorMsg.value = error.message
    console.log(error) 
    return
  
  } else {
    successMsg.value = 'Account Created. Please Wait.'
	  setTimeout(() => router.push("/game"), 1500)
    errorMsg.value = '';
    errMsgTellingUToFillForm.value = '';
    email.value = '';
    password.value = '';
    setTimeout(() => successMsg.value = '', 1510)
  }
}
</script>

<style>
  .signupBox{
    position: relative;
    height: 420px;
    width: 455px;
    justify-self: center;
    background-color: white;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    padding-top: 30px;
    border-radius: 10px;
    box-shadow: 0 0 18px 6px rgba(0, 183, 255, 0.301);
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
    transform: translate(150px, 80px);
  }
  p2{
    color: white;
    text-align: center;
    position: relative;
    top: 80px;
    display: block;
    cursor: pointer;
    transition: color 0.5s ease;
  }
  p2:hover{
    color: rgb(2, 155, 250);
  }
  .formErrorMsg{
    color: rgb(226, 0, 0);
  }
  .formSuccess{
    color: rgb(1, 200, 1);
  }
</style>

