<template>
    <main>
        <h1>Profiles</h1>
        <div v-if="profileStore.profile">
    </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'
import { supabase } from '../supabase'
const profilesStore = useProfileStore()
onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    await profileStore.fetchProfile(data.user.id)
  }
})
</script>

<style scoped>

</style>