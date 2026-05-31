<template>

    <div class="body">

    <div class="homepage">
        <h1>Welcome to [GAME TITLE]</h1>
    </div>

    <router-link to="/signup">
    <div class="signup">
        <h2>Sign Up</h2>
    </div>
    </router-link>

    <div class="signupBtn">
        <h2>Sign In</h2>
    </div>

    </div>

</template>

<script setup>

</script>

<style scoped>
    .homepage{
        background-color: rgb(1, 6, 44);
        height: 400px;
        width: 100%;
        position: relative;
        top: -35px;
        padding: 10px;
    }
    h1{
        color: rgb(124, 241, 177);
        font-size: 50px;
        text-align: center;
    }
    h2{
        color: black;
        font-weight: 10;
        font-family: Times New Roman;
        font-size: 20px;
        transform: translateY(10px);
    }
    .body{
        background-color: rgb(14, 51, 87);
        height: 1500px;
    }

    .signup{
        background-color: rgb(79, 216, 163);
        font-size: 15px;
        height: 40px;
        width: 80px;
        position: relative;
        left: 80%;
    }
    .signupBtn{
        background-color: rgb(79, 216, 163);
        font-size: 15px;
        height: 40px;
        width: 80px;
        position: relative;
        left: 80%;
    }
</style>