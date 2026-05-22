<template>
  <main>
    <h1>Profile</h1>
    <div v-if="profileStore.profile">
      <p>
        Username: {{ profileStore.profile.username }}
      </p>
      <p>
        Coins: {{ profileStore.profile.scores }}
      </p>
    </div>
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'
import { supabase } from '../supabase'
const profileStore = useProfileStore()
onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    await profileStore.fetchProfile(data.user.id)
  }
})
</script>
<style scoped>
</style>