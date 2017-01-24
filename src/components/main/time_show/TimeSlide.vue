<template lang="jade">
div#time-slide
  el-row(:gutter="20")
    el-col(:span="20", :offset="2")
      el-carousel(:interval="5000", type="card", height="650px", indicator-position="none")
        el-carousel-item(v-for="record in $store.state.timeRecords")
          div.slide-holder
            div.record-info
              h2 {{ record.year + '年' + record.month + '月' + record.date  + '日' }}
              h3 {{ days[record.day] }}
              p(v-for="(item, index) in record.items")
                {{ index + 1 + '. ' + item.content + ', ' + item.time + 'h.' }}
</template>

<script>
export default {
  name: 'time-slide',
  data () {
    return {
      days: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
    }
  }
}
</script>

<style lang="sass">
#time-slide
  width: 100%
  padding-top: 100px
  .slide-holder
    width: 100%
    height: 100%
    background: url(../../../assets/timeline-bg-0.jpg) no-repeat
    background-size: 100% 100%
    background-attachment: fixed
    position: relative
    .record-info
      width: 100%
      position: absolute
      bottom: 0
      color: white
      background: rgba(0, 0, 0, 0.3)
      padding-left: 35px
</style>