<template lang="jade">
div#time-analysis-per-year
  el-card
    div#bar-chart-year
    el-row(:gutter="20")
      el-col(:span="6", :offset="3")
        el-date-picker(v-model="year", type="year", placeholder="选择年份", @change="drawChart")
      el-col(:span="5", :offset="1")
        el-input(v-model="totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="5", :offset="1")
        el-input(v-model="avgTime", :disabled="true", placeholder="AVG:")
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-per-year',
  data () {
    return {
      year: '',
      totalTime: 'Total: 400h',
      avgTime: 'AVG: 50h'
    }
  },
  mounted () {
    // 按照昨天来设置默认年份
    let yesterday = new Date((new Date()).getTime() - 86400000)
    this.year = yesterday.getFullYear().toString()
    this.drawChart()
  },
  computed: {
    // 获取选中的年份的记录并计算每月的总时间
    timeRecordsOfYear () {
      return this.$store.state.timeRecords.filter(record => {
        return record.year === this.year
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
  methods: {
    drawChart (val) {
      console.log(this.year)
      if (val) this.year = val
      // 准备数据，为了防止数据为空导致渲染不出图表，所以在数据为空的项使用默认值0
      let totalOfYear = 0
      let data = new Array(12).fill(0)
      let dataAxis = new Array(12).fill(0).map((v, i) => i)
      for (let record of this.timeRecordsOfYear) {
        data[Number.parseInt(record.month) - 1] += record.totalTimeOfDay
        totalOfYear += record.totalTimeOfDay
      }
      this.totalTime = 'Total: ' + totalOfYear
      this.avgTime = 'AVG: ' + (totalOfYear / data.filter(x => x !== 0).length)

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
          max: 800,
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

      let chart = Echarts.init(document.querySelector('#bar-chart-year'))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="sass">
#time-analysis-per-year
  margin-top: 20px
  width: 100%
  #bar-chart-year
    width: 100%
    height: 320px
</style>