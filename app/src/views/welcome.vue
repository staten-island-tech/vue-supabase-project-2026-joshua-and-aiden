<template>

    
    <div class="homepage">
        <h1>Welcome to [GAME TITLE]</h1>
    </div>

    <div class="signup" @click="signupBtn">
        <h2>Sign Up</h2>
    </div>

    <div class="login">
        <h2>Login</h2>
    </div>


</template>

<script setup>
    import { useRouter } from 'vue-router';
    const toSignupPage = useRouter();

    function signupBtn() {
        toSignupPage.push('/signup')
    }
</script>

<style>
    .homepage{
        background-color: rgb(1, 6, 44);
        height: 400px;
        position: relative;
        bottom: 35px;
        padding-top: 30px;
    }
    h1{
        color: rgb(124, 241, 177);
        font-size: 50px;
        text-align: center;
    }
    h2{
        color: black;
        font-weight: 10;
        font-family: "inter", sans-serif;
        font-size: 20px;
        transform: translateY(10px);
    }
    body{
        background-color: rgb(14, 51, 87);
        background-size: cover;
        margin: 0px;
        padding: 0px;
    }

    .signup{
        background-color: rgb(79, 216, 163);
        font-size: 15px;
        height: 40px;
        width: 80px;
        position: relative;
        left: 80%;
        text-align: center;
        cursor: pointer;
        border-radius: 15px;
        transition: transform 0.5s ease;
    }
    .signup:hover{
        background-color: rgb(59, 157, 119);
        transform: scale(1.1);
    }
    .login{
        background-color: rgb(79, 216, 163);
        font-size: 15px;
        height: 40px;
        width: 80px;
        position: relative;
        left: 80%;
        text-align: center;
        border-radius: 15px;
    }
</style>