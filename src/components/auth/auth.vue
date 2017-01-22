<template lang="jade">
div#auth
 star-flow
</template>

<script>
import StarFlow from './StarFlow'

export default {
  name: 'auth',
  components: { StarFlow }
}
</script>

<style lang="sass">
#auth
  width: 100%
  height: 100%
  background: url(../../assets/auth-bg.jpg) no-repeat
  background-size: 100% 100%
  background-attachment: fixed
</style>