<template>
    <div class="loginPage">

        <router-link class="returnBtn" to= '/' >Back</router-link>

        <h3>Log In</h3>
        <p>Email Address</p>
        <input class="usernameBox" type="text" v-model="email" placeholder="Enter Email Address" required>

        <p>Password</p>
        <input class="passwordBox" type="password" v-model="password" placeholder="Enter Password" required>

        <button class="loginBtn">Log In</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const email = ref('');
    const password = ref('');
    const isLoggedIn = ref(false);
</script>

<style scoped>
    .returnBtn{
        font-size: 16px;
        position: relative;
        bottom: 18px;
    }
    .loginPage{
        height: 500px;
        width: 450px;
        background-color: white;
        justify-self: center;
        text-align: left;
        box-sizing: border-box;
        padding-left: 20px;
        border-radius: 10px;
        position:relative;
        top: 80px;
    }
    h3{
        color: black;
        font-size: 45px;
        font-family: Georgia;
        position: relative;
        top: -50px;
    }
    p{
        color: black;
        font-size: 25px;
        position: relative;
        top: -50px;
        
    }
    .usernameBox{
        position: relative;
        top: -95px;
        height: 20px;
        width: 300px;
        border-style: double;
        border-radius: 5px;
    }
    .passwordBox{
        position: relative;
        top: -95px;
        height: 20px;
        width: 300px;
        border-style: double;
        border-radius: 5px;
    }
    .loginBtn{
        height: 45px;
        width: 75px;
        font-size: 18px;
        border-radius: 10px;
        background-color: rgb(63, 82, 177);
        position:relative;
        top: 10px;
        cursor: pointer;
        border-color: transparent;
    }
</style>