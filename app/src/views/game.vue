<template>
    <div>
        <canvas ref="canvas" width="800" height="600"></canvas>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  
  const player = { x: 100, y: 100, w: 40, h: 40, speed: 4 }
  const keys = {}

  window.addEventListener('keydown', e => keys[e.key] = true)
  window.addEventListener('keyup',   e => keys[e.key] = false)

  function update() {
    if (keys['ArrowLeft'])  player.x -= player.speed
    if (keys['ArrowRight']) player.x += player.speed
    if (keys['ArrowUp'])    player.y -= player.speed
    if (keys['ArrowDown'])  player.y += player.speed
  }

  function draw() {
    ctx.clearRect(0, 0, 800, 600)
    ctx.fillStyle = '#4f46e5'
    ctx.fillRect(player.x, player.y, player.w, player.h)
  }

  function loop() {
    update()
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
        border: 2px;
    }
</style>