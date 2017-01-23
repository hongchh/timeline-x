<template lang="jade">
div#timeline
  div.timeline-wrapper
    div.timeline
      div.timeline-records(v-for="record in records")
        div.side-info
          span.year {{ record.year }}
        div.timeline-icon(:class="record.icon_bg")
          div.month {{ record.month }} 月
            span.date {{ record.date }}
        div.timeline-content
          h2.day {{ record.day }}
          div.details
            p(v-for="(item, index) in record.items")
              {{ index + 1 + '. ' + item.content + ', ' + item.time + 'h.' }}
</template>

<script>
export default {
  name: 'timeline',
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
      }]
    }
  }
}
</script>

<style lang="sass">
#timeline
  width: 90%
  height: 90%
  position: absolute
  top: 5%
  left: 5%
  border: 10px solid rgba(21, 70, 251, 0.75)
  border-radius: 30px
  box-shadow: 2px 2px 2px grey
  background: url(../../../assets/timeline-bg-0.jpg) no-repeat
  background-size: 100% 100%
  background-attachment: fixed
  .timeline-wrapper, .timeline-wrapper *
    box-sizing: border-box
    padding: 0
    margin: 0
  .timeline-wrapper
    width: 90%
    font-family: Arial,Helvetica,sans-serif
    font-weight: 400
    position: absolute
    top: 4em
    left: 5%
    .timeline
      padding: 20px 0
      position: relative
      .timeline-records
        margin: 0
        border: 0 none
        padding: 0 60px 5px 0
        width: 50%
        .side-info
          left: 50%
          margin: 45px 0 0 50px
          position: absolute
          font-weight: 500
          color: white
        .timeline-icon
          background: #fff
          line-height: 70px
          position: absolute
          text-align: center
          margin: 22px 0 0 -35px
          border-radius: 40px
          color: #FFF
          font-size: 18px
          height: 70px
          width: 70px
          left: 50%
          z-index: 10
          .month
            font-family: Arial,Helvetica,sans-serif
            line-height: 30px
            font-weight: 500
            font-size: 13px
            padding: 5px 0
            .date
              display: block
              line-height: 12px
              font-weight: 700
              font-size: 30px
        .iconbg-turqoise
          background: #28C0C6
        .iconbg-black
          background: #2F3949
        .iconbg-brown
          background: #E46D2B
        .iconbg-indigo
          background: #3F51B5
        .iconbg-purple
          background: #9C27B0
        .iconbg-grey
          background: #7E8DA3
        .iconbg-blue
          background: #2196F3
        .iconbg-red
          background: #F25B5A
        .iconbg-orange
          background: #F0CA45
        .iconbg-opal
          background: #76BBDA
        .iconbg-green
          background: #75CE66
        .iconbg-pink
          background: #F282C7
        .iconbg-turqoise, .iconbg-red, .iconbg-opal, .iconbg-blue,
        .iconbg-grey, .iconbg-pink, .iconbg-green, .iconbg-black,
        .iconbg-brown, .iconbg-purple, .iconbg-indigo, .iconbg-orange
          box-shadow: 0 0 0 4px white,inset 0 2px 0 rgba(0,0,0,0.30),0 3px 0 4px rgba(0,0,0,0.30)
        .timeline-content
          background: rgba(0, 0, 0, 0.3)
          color: white
          position: relative
          transition: all .4s
          border-radius: 10px
          padding: 30px
          box-shadow: 0px -5px 5px rgba(0,0,0,0.30) inset
          .day
            font-size: 18px
            font-family: Arial,Helvetica,sans-serif
            margin: 0 0 10px
            color: #00efc8
            font-weight: 500
          .details
            margin: 0
            p
              margin: 0
              line-height: 24px
              font-size: 18px
              font-weight: 400
        .timeline-content:after
          content: ""
          display: block
          border: 15px solid transparent
          border-left-color: rgba(0, 0, 0, 0.3)
          position: absolute
          right: -30px
          top: 26px
      .timeline-records:nth-child(even)
        margin-left: 50%
        padding: 0 0 5px 60px
        .side-info
          left: auto
          margin: 25px 50px 0 0
          text-align: right
          right: 50%
        .timeline-content:before
          border: 15px solid transparent
          border-right-color: rgba(0, 0, 0, 0.3)
          left: -30px
          right: auto
        .timeline-content:after
          border: 14px solid transparent
          border-right-color: rgba(0, 0, 0, 0.3)
          left: -27px
          right: auto
    .timeline:before
      content: ""
      background-color: rgba(0, 0, 0, 0.3)
      border-radius: 2px
      margin-left: -2px
      position: absolute
      display: block
      height: 100%
      width: 4px
      left: 50%
      top: 0
</style>