<template>
  <p2 @click="returnToGame"> -RETURN- </p2>
  <main>
 <div v-if="auth.loading || profileStore.loading">Loading...</div>
    <div v-else-if="!auth.user">
      <p>Not signed in. <router-link to="/login">Log in</router-link></p>
    </div>
    <div v-else-if="profileStore.error">
      <p>Error: {{ profileStore.error.message || profileStore.error }}</p>
    </div>
    <div v-else-if="profile" class="statUser">
      <p>Username: {{ profileDisplayName }}</p>
      <p>Score: {{ profile.score_balance ?? profile.scores ?? 0 }}</p>
    </div>
    <div v-else>
      <p>No profile found. You may need to create one.</p>
    </div>
  </main>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profiles'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()
function returnToGame() {
  router.push('/game')
}
onMounted(async () => {
  if (!auth.user && !auth.loading) await auth.init()
  if (auth.user) await profileStore.fetchProfile(auth.user.id)
})
const profile = computed(() => profileStore.profile)
const profileDisplayName = computed(() => {
  if (!profile.value) return auth.user?.user_metadata?.username || auth.user?.email || ''
  if (profile.value.username) return profile.value.username
  if (profile.value.first_name) return profile.value.first_name
  const fullName = `${profile.value.first_name ?? ''} ${profile.value.last_name ?? ''}`.trim()
  return fullName || auth.user?.user_metadata?.username || auth.user?.email || ''
})

</script>
<style scoped>
  .statUser {
    background-color: white;
    width: 800px;
    height: 400px;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -72%);
  }
  p{
    font-size: 25px;
    font-family: 'Fredoka One', sans-serif;
  }
</style>