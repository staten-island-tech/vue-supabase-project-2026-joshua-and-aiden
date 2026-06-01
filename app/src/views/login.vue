<template>
    
    <p2 @click="returnback"> -RETURN- </p2>

    <div class="loginBox">
        <p1>Welcome Back</p1>
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter Email"/>
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter Password"/>
        <button @click.prevent;="login(); popUp()">Login</button>

        <p v-if="errorMsg" class="formErrorMsg">*{{ errorMsg }}</p>

        <p v-if="successMsg" class="formSuccess">{{ successMsg }}</p>

        <p v-if="errMsgTellingUToFillForm" class="formErrorMsg">*{{ errMsgTellingUToFillForm }}</p>

    </div>
</template>

<script setup> //Email: testuser1234@gmail.com  Password: test1234
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import { email, password, errorMsg, successMsg, errMsgTellingUToFillForm } from '../stores/loginsignup'

const router = useRouter();

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

const login = async () => {

  if (popUp() === false) {
    return
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    errorMsg.value = error.message
    console.log(error) 
    return
  
  } else {
    successMsg.value = 'Logging In. Please Wait.'
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
    .loginBox{
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
  }
  .formErrorMsg{
    color: rgb(226, 0, 0);
  }
  .formSuccess{
    color: rgb(1, 200, 1);
  }
</style>