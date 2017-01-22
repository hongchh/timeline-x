<template lang="jade">
div#main
  div#header
    el-row(:gutter="20", :justify="center")
      el-col(:span="2", :offset="16")
        span.header-item 时光展
      el-col(:span="2")
        span.header-item 管理
      el-col(:span="2")
        span.header-item 锁屏
  div#body
    router-view
</template>

<script>
export default {
  name: 'main'
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
    background-color: rgba(21, 70, 251, 0.75)
    color: white
    line-height: 100px
    .el-row
      vertical-align: middle
      .header-item
        font-size: 25px
      .header-item:hover
        color: #79f7af
        cursor: pointer
  #body
    width: 100%
    position: absolute
    top: 100px
</style>