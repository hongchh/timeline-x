<template lang="jade">
div#main
  div#header
    el-row(:gutter="20")
      el-col(:span="1", :offset="1")
        i.el-icon-time#logo
      el-col(:span="2", :offset="12")
        router-link.header-item(to="timeline", active-class="header-item-active") 时光轴
      el-col(:span="2")
        router-link.header-item(to="time-slide", active-class="header-item-active") 时光展
      el-col(:span="2")
        router-link.header-item(to="management", active-class="header-item-active") 管理
      el-col(:span="2")
        span.header-item(@click="lockScreen") 锁屏
  div#body
    router-view
</template>

<script>
export default {
  name: 'main',
  methods: {
    lockScreen () {
      this.$store.commit('LOCK')
      this.$router.replace('/auth')
    }
  },
  created () {
    if (this.$store.state.timeRecords.length === 0) {
      this.$store.dispatch('fatchData')
    }
  }
}
</script>

<style lang="sass">
#main
  width: 100%
  height: 100%
  position: absolute
  background: url(../../assets/main-bg.jpg) no-repeat
  background-size: 100% 100%
  background-attachment: fixed
  #header
    width: 100%
    height: 100px
    position: absolute
    background-color: rgba(0, 0, 0, 0.15)
    box-shadow: 0px -3px 3px rgba(0,0,0,0.30) inset
    line-height: 100px
    z-index: 99
    .el-row
      vertical-align: middle
      .header-item, #logo
        font-size: 25px
        color: white
        text-decoration: none
      .header-item:hover, .header-item-active
        color: #79f7af
        cursor: pointer
  #body
    width: 100%
    position: absolute
    top: 100px
    bottom: 0

.el-dropdown-menu .menu-link
  font-size: 20px
  text-decoration: none
  color: black
</style>