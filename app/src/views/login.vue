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