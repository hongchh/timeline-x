<template lang="jade">
div#time-slide
  el-row(:gutter="20")
    el-col(:span="20", :offset="2")
      el-carousel(:interval="4000", type="card", height="650px", indicator-position="none", arrow="always")
        el-carousel-item(v-for="(record, i) in $store.state.timeRecords")
          div.slide-holder(:class="'slide-bg-' + Number.parseInt(i % 10)")
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
      days: [ // 星期几中文映射
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
  .slide-bg-0
    background-image: url(../../../assets/slide-bg-0.jpg)
  .slide-bg-1
    background-image: url(../../../assets/slide-bg-1.jpg)
  .slide-bg-2
    background-image: url(../../../assets/slide-bg-2.jpg)
  .slide-bg-3
    background-image: url(../../../assets/slide-bg-3.jpg)
  .slide-bg-5
    background-image: url(../../../assets/slide-bg-5.jpg)
  .slide-bg-6
    background-image: url(../../../assets/slide-bg-6.jpg)
  .slide-bg-7
    background-image: url(../../../assets/slide-bg-7.jpg)
  .slide-bg-8
    background-image: url(../../../assets/slide-bg-8.jpg)
  .slide-bg-9
    background-image: url(../../../assets/slide-bg-9.jpg)
  .slide-holder
    width: 100%
    height: 100%
    background-repeat: no-repeat
    background-size: 100% 100%
    background-attachment: fixed
    position: relative
    .record-info
      width: 100%
      position: absolute
      bottom: 0
      color: white
      background: rgba(0, 0, 0, 0.5)
      padding-left: 35px
</style>