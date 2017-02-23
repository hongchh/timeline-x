<template lang="jade">
div#time-analysis-per-year
  el-card
    div#bar-chart-year
    el-row(:gutter="20")
      el-col(:span="7", :offset="1")
        el-date-picker(v-model="year", type="year", placeholder="选择年份", @change="drawChart")
      el-col(:span="6", :offset="2")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="6", :offset="1")
        el-input(:value="'AVG: ' + (totalTime / (chartData.filter(x => Number.parseInt(x) !== 0).length)).toFixed(1)", :disabled="true", placeholder="AVG:")
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-per-year',
  data () {
    return {// 按照昨天来设置默认年份
      year: new Date((new Date()).getTime() - 86400000).getFullYear().toString()
    }
  },
  mounted () { this.drawChart() },
  computed: {
    chartData () {
      if (typeof this.year !== 'string') {
        this.year = this.year.getFullYear().toString()
      }
      let data = new Array(12).fill(0)
      this.$store.state.timeRecords.filter(record => { // 过滤对应年份的数据
        return Number.parseInt(record.year) === Number.parseInt(this.year)
      }).forEach(record => { // 计算每个月的总时间
        record.items.forEach(item => {
          data[Number.parseInt(record.month) - 1] += Number.parseFloat(item.time)
        })
      })
      for (let i = 0; i < data.length; ++i) { data[i] = data[i].toFixed(1) }
      return data
    },
    totalTime () { // 本年总的时间支出
      let total = 0
      this.chartData.forEach(data => (total += Number.parseFloat(data)))
      return total.toFixed(1)
    }
  },
  methods: {
    drawChart () {
      let option = { // 渲染柱形图的配置
        title: {
          text: '年份时间统计',
          subtext: '单位：小时',
          x: '2%',
          textStyle: {
            color: 'white'
          },
          subtextStyle: {
            color: 'white'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{c} 小时'
        },
        xAxis: {
          data: new Array(12).fill(0).map((v, i) => i + 1),
          axisLabel: {
            interval: 0,
            textStyle: {
              color: 'white'
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
          axisLabel: { textStyle: { color: 'white' } }
        },
        dataZoom: [{ type: 'inside' }],
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#ff4949'},
                {offset: 0.5, color: '#f7ba2a'},
                {offset: 1, color: '#13ce66'}
              ])
            },
            emphasis: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#fb1111'},
                {offset: 0.7, color: '#efac0d'},
                {offset: 1, color: '#02d45f'}
              ])
            }
          },
          data: this.chartData
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
  margin-top: 15px
  width: 100%
  #bar-chart-year
    width: 100%
    height: 240px
</style>