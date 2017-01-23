<template lang="jade">
div#main
  div#header
    el-row(:gutter="20")
      el-col(:span="1", :offset="1")
        i.el-icon-time#logo
      el-col(:span="2", :offset="14")
        el-dropdown
          span.header-item  时光展 <i class="el-icon-caret-bottom el-icon--right"></i>
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item
              router-link.menu-link(to="timeline") 轴线图
            el-dropdown-item
              router-link.menu-link(to="time-slide") 轮播图
      el-col(:span="2")
        router-link.header-item(to="management") 管理
      el-col(:span="2")
        span.header-item(@click="lockScreen") 锁屏
  div#body
    transition(name="slide")
      router-view
</template>

<script>
export default {
  name: 'main',
  methods: {
    lockScreen () {
      // TODO: 锁屏并跳转回到auth
      this.$message('锁屏，待实现...')
    }
  }
}
</script>

<style lang="sass">
#main
  width: 100%
  height: 100%
  position: absolute
  #header
    width: 100%
    height: 100px
    position: absolute
    background-color: #4b71fd
    line-height: 100px
    z-index: 99
    .el-row
      vertical-align: middle
      .header-item, #logo
        font-size: 25px
        color: white
        text-decoration: none
      .header-item:hover
        color: #79f7af
        cursor: pointer
  #body
    width: 100%
    position: absolute
    top: 100px
    bottom: 0
    background: #eee

.el-dropdown-menu .menu-link
  font-size: 20px
  text-decoration: none
  color: black

.slide-enter-active, .slide-leave-active
  transition: all .5s ease-out
.slide-leave-active
  transform: translate(0, -100%) scale(0.6)
  opacity: 0
.slide-enter
  transform: translate(0, 100%) scale(0.6)
  opacity: 0
</style>