<template>
    <div class="canvasBox">
        <canvas ref="canvas" width="800" height="600"></canvas>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  
  const player = { 
    x: 100,
    y: 100,
    w: 40, 
    h: 40, 
    speed: 10, 
    velocityY: 0}

  const keys = {}
  const gravity = 0.5
  let isOnGround = false

  window.addEventListener('keydown', e => keys[e.key] = true)
  window.addEventListener('keyup',   e => keys[e.key] = false)

  function update() {
    if (keys['ArrowLeft'])  player.x -= player.speed
    if (keys['ArrowRight']) player.x += player.speed
    if (keys['ArrowUp']) player.velocityY = -8  
  }
  
  function leftWall() {
  if(player.x < 0) {
    player.x = 0
  }  
}
  function rightWall() {
    if(player.x >= 760) {
    player.x = 760
  }
}
  function bottomWall() {
    if(player.y >= 560) {
      player.y = 560
      player.velocityY = 0
      isOnGround = true
    } else {
      isOnGround = false
    }
}
  function topWall() {
    if(player.y <= 0) {
      player.y = 0
    }
}
  function draw() {
    ctx.clearRect(0, 0, 800, 600)
    ctx.fillStyle = '#4f46e5'
    ctx.fillRect(player.x, player.y, player.w, player.h)
}
  function move() {
    player.velocityY += gravity
    player.y += player.velocityY
}
  function loop() {
    update()
    move()
    leftWall()
    rightWall()
    bottomWall()
    topWall()
    draw()
    animationId = requestAnimationFrame(loop)
  }

  loop()
})

onUnmounted(() => cancelAnimationFrame(animationId))
</script>

<style>
    canvas{
        background-color: white;
        border-color: black;
    }
    .canvasBox{
      justify-self: center;
      position: relative;
      top: 80px;
    }
</style>