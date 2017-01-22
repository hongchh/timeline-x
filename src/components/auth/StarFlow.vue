<template lang="jade">
  canvas#star-flow
</template>

<script>
class Star {
  constructor (canvasWidth, canvasHeight) {
    this.initProperties(canvasWidth, canvasHeight)
  }

  initProperties (canvasWidth, canvasHeight) {
    this.position = {
      x: Math.random() * canvasWidth,
      y: Math.random() * 100 + canvasHeight
    }
    this.alpha = 0.5 + Math.random() * 0.3
    this.scale = 0.1 + Math.random() * 0.3
    this.velocity = Math.random() * 1.5
  }

  move () {
    this.position.y -= this.velocity
    this.alpha -= 0.0008
  }
}

class StarFlow {
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas = document.querySelector('#star-flow')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.stars = []

    // 创建星星
    for (let i = 0; i < this.width * 0.5; ++i) {
      this.stars.push(new Star(this.width, this.height))
    }

    // 监听窗口变化
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.canvas.width = this.width
      this.canvas.height = this.height
    })
  }

  // 星星飘动
  flowing () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for (let star of this.stars) {
      if (star.alpha <= 0) {
        star.initProperties(this.width, this.height)
      }
      star.move()
      this.ctx.beginPath()
      this.ctx.arc(star.position.x, star.position.y,
        star.scale * 10, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = 'rgba(255, 255, 255, ' + star.alpha + ')'
      this.ctx.fill()
    }
    window.requestAnimationFrame(this.flowing.bind(this))
  }
}

export default {
  name: 'star-flow',
  mounted () {
    (new StarFlow()).flowing()
  }
}
</script>