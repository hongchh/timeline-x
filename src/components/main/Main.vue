<template lang="jade">
div#main
  h1 Main
  div#sub-view
    //- transition(name="slide-left")
    router-view
</template>

<script>
export default {
  name: 'main'
}
</script>

<style lang="sass">
// .slide-left-enter-active
//   transition: all .3s ease
// .slide-left-leave-active
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
// .slide-left-enter, .slide-left-leave-active
//   left: -100%
//   opacity: 0
</style>