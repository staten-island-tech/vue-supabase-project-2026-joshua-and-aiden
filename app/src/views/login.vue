<template>

    <router-link class="returnBtn" to= '/' >Back</router-link>

    <div class="loginPage">
        <h3>Log In</h3>
        <p>Username</p>
        <input class="usernameBox" type="text" v-model="username" placeholder="Enter Username">

        <p>Password</p>
        <input class="passwordBox" type="text" v-model="password" placeholder="Enter Password">

        <button class="loginBtn">Log In</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const username = ref('');
    const password = ref('');
</script>

<style scoped>
    .returnBtn{
        font-size: 16px;
        position: relative;
        top: 150px;
    }
    .loginPage{
        height: 500px;
        width: 450px;
        background-color: white;
        justify-self: center;
        text-align: left;
        box-sizing: border-box;
        padding: 8px;
        padding-left: 20px;
        border-radius: 10px;
        position:relative;
        top: 80px;
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
    .loginBtn{
        height: 45px;
        width: 75px;
        font-size: 18px;
        border-radius: 10px;
        background-color: rgb(63, 82, 177);
        position:relative;
        top: 30px;
        cursor: pointer;
    }
</style>