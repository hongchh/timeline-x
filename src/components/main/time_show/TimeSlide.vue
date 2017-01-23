<template lang="jade">
div#time-slide
  el-row(:gutter="20")
    el-col(:span="20", :offset="2")
      el-carousel(:interval="4000", type="card", height="650px")
        el-carousel-item(v-for="record in records")
          div.slide-holder
            div.record-info
              h2 {{ record.year + '年' + record.month + '月' + record.date  + '日' }}
              h3 {{ record.day }}
              p(v-for="(item, index) in record.items")
                {{ index + 1 + '. ' + item.content + ', ' + item.time + 'h.' }}
</template>

<script>
export default {
  name: 'time-slide',
  data () {
    return {
      records: [{
        year: '2017',
        month: '01',
        date: '22',
        day: '星期日',
        icon_bg: 'iconbg-turqoise',
        items: [{
          content: '开发timeline-x',
          time: '9'
        }, {
          content: '跑步',
          time: '0.5'
        }]
      }, {
        year: '2017',
        month: '01',
        date: '23',
        day: '星期一',
        icon_bg: 'iconbg-black',
        items: [{
          content: '开发timeline-x',
          time: '9'
        }, {
          content: '跑步',
          time: '0.5'
        }]
      }, {
        year: '2017',
        month: '01',
        date: '24',
        day: '星期二',
        icon_bg: 'iconbg-black',
        items: [{
          content: '开发timeline-x',
          time: '9'
        }, {
          content: '跑步',
          time: '0.5'
        }]
      }]
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
      padding-left: 20px
</style>