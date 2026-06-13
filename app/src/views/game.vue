<template>
  <div>
    <button  @click ='logOut()' class="signOut">Log Out</button>
    <p v-if="logOutMsg">{{ logOutMsg }}</p>
  </div>
</template>

<script setup>
  import { supabase } from '@/supabase';
  import { logOutMsg } from '@/stores/loginsignup';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  async function logOut() {
  const { error } = await supabase.auth.signOut() 
    if(error) {
      console.log(error)
    } else {
      setTimeout(() => router.push("/"), 1500)
      logOutMsg.value = 'Logging Out...'
    }
   }
    
   window.addEventListener('load', function() {
      const canvas = document.getElementById('canvas1');
      const ctx = canvas.getContext('2d');
      canvas.width = 500;
      canvas.height = 500;
    });
</script>

<style scoped>

</style>