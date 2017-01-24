<template lang="jade">
  div#app
    transition(name="fade")
      router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
html, body, #app
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  padding: 0
  margin: 0
  overflow-x: hidden
.fade-enter-active, .fade-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-active
  transform: scale(1.2)
  opacity: 0
</style>
