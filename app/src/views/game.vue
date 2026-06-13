<template>
  <div>
    <button @click="logOut()" class="signOut">Log Out</button>
    <p v-if="logOutMsg">{{ logOutMsg }}</p>
  </div>
  <canvas id="canvas1"></canvas>
</template>

<script setup>
import { supabase } from '@/supabase'
import { logOutMsg } from '@/stores/loginsignup'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profiles'

const router = useRouter()
const auth = useAuthStore()
const profileStore = useProfileStore()

async function logOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    setTimeout(() => router.push('/'), 1500)
    logOutMsg.value = 'Logging Out...'
    setTimeout(() => (logOutMsg.value = ''), 1510)
  }
}

onMounted(async () => {
  if (!auth.user && !auth.loading) await auth.init()
  if (auth.user) await profileStore.fetchProfile(auth.user.id)
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  canvas.width = 900
  canvas.height = 600

  const player = {
    x: 30,
    y: 30,
    w: 40,
    h: 40,
    speed: 10,
    velocityY: 0,
  }

  const obstacles = [
    {
      x: 300,
      y: 380,
      w: 80,
      h: 300,
      speed: 5,
    },
    {
      x: 300,
      y: -150,
      w: 80,
      h: 300,
      speed: 5,
    },
    {
      x: 600,
      y: 0,
      w: 80,
      h: 80,
      speed: 3,
    },
    {
      x: 600,
      y: 300,
      w: 80,
      h: 300,
      speed: 3,
    },
  ]

  const keys = {}
  const gravity = 1
  let upPressed = false
  let gameOver = false
  let runScore = 0
  let floats = []

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && !upPressed) {
      player.velocityY = -10
      upPressed = true
    }
    keys[e.key] = true
  })
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false

    if (e.key === 'ArrowUp') {
      upPressed = false
    }
  })

  function animate() {
    if (gameOver === true) {
      ctx.font = '50px Montana'
      ctx.fillStyle = 'red'
      ctx.fillText('GAME OVER', 290, 300)
      return
    }

    if (keys['ArrowRight']) player.x += player.speed
    if (keys['ArrowLeft']) player.x -= player.speed
    if (keys['ArrowUp']) player.y -= player.speed
    if (keys['ArrowDown']) player.y += player.speed

    if (player.y + player.h >= canvas.height) {
      player.y = canvas.height - player.h
      player.velocityY = 0
    }

    if (player.y <= 0) {
      player.y = 0
      player.velocityY = 0
    }

    if (player.x <= 0) {
      player.x = 0
    }

    if (player.x + player.w >= canvas.width) {
      player.x = canvas.width - player.w
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.velocityY += gravity
    player.y += player.velocityY

    ctx.fillStyle = 'rgb(255, 234, 0)'
    ctx.fillRect(player.x, player.y, player.w, player.h)

    obstacles.forEach((obstacle) => {
      if (typeof obstacle.x !== 'number' || typeof obstacle.y !== 'number') return

      obstacle.w = Number(obstacle.w || 80)
      obstacle.h = Number(obstacle.h || 80)

      const prevRight = obstacle.x + obstacle.w
      obstacle.x += obstacle.speed
      const currRight = obstacle.x + obstacle.w

      if (!obstacle.passed && prevRight >= player.x && currRight < player.x) {
        obstacle.passed = true
        const award = 10
        runScore += award
        floats.push({ x: obstacle.x + obstacle.w / 2, y: obstacle.y, text: `+${award}`, life: 60 })
      }

      if (obstacle.x <= 0 || obstacle.x + obstacle.w >= canvas.width) {
        obstacle.speed *= -1
        obstacle.passed = false
      }

      if (
        player.x < obstacle.x + obstacle.w &&
        player.x + player.w > obstacle.x &&
        player.y < obstacle.y + obstacle.h &&
        player.y + player.h > obstacle.y
      ) {
        gameOver = true
        if (auth.user && runScore > 0) {
          profileStore
            .updateScore(auth.user.id, runScore)
            .catch((e) => console.error('updateScore error', e))
        }
      }
      ctx.fillStyle = 'rgb(0, 104, 0)'
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)
    })

    for (let i = floats.length - 1; i >= 0; i--) {
      const f = floats[i]
      ctx.save()
      ctx.globalAlpha = Math.max(0, f.life / 60)
      ctx.font = '20px sans-serif'
      ctx.fillStyle = 'white'
      ctx.fillText(f.text, f.x, f.y)
      ctx.restore()
      f.y -= 0.8
      f.life -= 1
      if (f.life <= 0) floats.splice(i, 1)
    }

    const saved = Number(profileStore.profile?.score_balance || 0)
    ctx.font = '24px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText(`Saved: ${saved}  Run: ${runScore}`, 20, 40)

    if (!gameOver) requestAnimationFrame(animate)
  }
  animate()
})
</script>

<style scoped>
p {
  color: rgb(1, 200, 1);
  position: relative;
  left: 1020px;
  bottom: 10px;
}
.signOut {
  position: absolute;
  left: 60%;
  top: -10px;
}
#canvas1 {
  border: 5px solid black;
  background-color: rgb(0, 162, 255);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
