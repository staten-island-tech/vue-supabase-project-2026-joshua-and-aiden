<template>
  <main>
 <div v-if="auth.loading || profileStore.loading">Loading...</div>
    <div v-else-if="!auth.user">
      <p>Not signed in. <router-link to="/login">Log in</router-link></p>
    </div>
    <div v-else-if="profileStore.error">
      <p>Error: {{ profileStore.error.message || profileStore.error }}</p>
    </div>
    <div v-else-if="profile">
      <p>Username: {{ profileDisplayName }}</p>
      <p>Score: {{ profile.score_balance ?? profile.scores ?? 0 }}</p>
    </div>
    <div v-else>
      <p>No profile found. You may need to create one.</p>
    </div>
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profiles'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const profileStore = useProfileStore()
onMounted(async () => {
  if (!auth.user && !auth.loading) await auth.init()
  if (auth.user) await profileStore.fetchProfile(auth.user.id)
})
const profile = computed(() => profileStore.profile)
const profileDisplayName = computed(() => {
  if (!profile.value) return ''
  return profile.value.username ?? `${profile.value.first_name ?? ''} ${profile.value.last_name ?? ''}`.trim()
})
</script>
<style scoped>
</style>