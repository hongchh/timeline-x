<template lang="jade">
div#time-analysis-per-month
  el-card
    div#bar-chart-month
    el-row(:gutter="20")
      el-col(:span="6", :offset="3")
        el-date-picker(v-model="month", type="month", placeholder="选择月份")
      el-col(:span="5", :offset="1")
        el-input(v-model="totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="5", :offset="1")
        el-input(v-model="avgTime", :disabled="true", placeholder="AVG:")
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-per-month',
  data () {
    return {
      month: '2017-01',
      totalTime: 'Total: ',
      avgTime: 'AVG: '
    }
  },
  computed: {
    // 获取选中的年月份的记录并计算每天的总时间
    timeRecordsOfMonth () {
      return this.$store.state.timeRecords.filter(record => {
        return (record.year === this.month.split('-')[0] &&
          record.month === this.month.split('-')[1])
      }).map(record => {
        let totalTimeOfDay = 0
        for (let item of record.items) {
          totalTimeOfDay += Number.parseFloat(item.time)
        }
        record.totalTimeOfDay = totalTimeOfDay
        return record
      })
    }
  },
  mounted () {
    // 按照昨天来设置默认年月份，因为今天的时间可能还没有记录
    let yesterday = new Date((new Date()).getTime() - 86400000)
    let month = yesterday.getMonth() + 1
    if (month < 10) month = '0' + month
    this.month = yesterday.getFullYear() + '-' + month

    // 准备数据，为了防止数据为空导致渲染不出图表，所以在数据为空时使用默认数据
    let totalOfMonth = 0
    let data = this.timeRecordsOfMonth === [] ? new Array(31).fill(0) : []
    let dataAxis = this.timeRecordsOfMonth === [] ? new Array(31).map((v, i) => i + 1) : []
    for (let record of this.timeRecordsOfMonth) {
      data.push(record.totalTimeOfDay)
      dataAxis.push(record.date)
      totalOfMonth += record.totalTimeOfDay
    }
    this.totalTime = 'Total: ' + totalOfMonth
    this.avgTime = 'AVG: ' + (totalOfMonth / this.timeRecordsOfMonth.length)

    // 渲染柱形图的配置
    let option = {
      title: {
        text: '每月时间统计',
        subtext: '单位：小时',
        x: '5%'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{c} 小时'
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: { show: false },
        axisLine: { show: false },
        z: 10
      },
      yAxis: {
        max: 24,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { textStyle: { color: '#999' } }
      },
      dataZoom: [{ type: 'inside' }],
      series: [{
        type: 'bar',
        itemStyle: {
          normal: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#83bff6'},
              {offset: 0.5, color: '#188df0'},
              {offset: 1, color: '#188df0'}
            ])
          },
          emphasis: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#2378f7'},
              {offset: 0.7, color: '#2378f7'},
              {offset: 1, color: '#83bff6'}
            ])
          }
        },
        data: data
      }]
    }

    let chart = Echarts.init(document.querySelector('#bar-chart-month'))
    chart.setOption(option)
  }
}
</script>

<style lang="sass">
#time-analysis-per-month
  width: 100%
  #bar-chart-month
    width: 100%
    height: 320px
</style>