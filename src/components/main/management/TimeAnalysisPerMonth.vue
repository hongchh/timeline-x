<template lang="jade">
div#time-analysis-per-month
  el-card
    div#bar-chart-month
    el-row(:gutter="20")
      el-col(:span="7", :offset="1")
        el-date-picker(v-model="month", type="month", placeholder="选择月份", @change="drawChart")
      el-col(:span="6", :offset="2")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="6", :offset="1")
        el-input(:value="'AVG: ' + (totalTime / (chartData.filter(x => Number.parseInt(x) !== 0).length)).toFixed(1)", :disabled="true", placeholder="AVG:")
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-per-month',
  data () {
    // 按照昨天来设置默认年月份，因为今天的时间可能还没有记录
    return { month: this.format(new Date((new Date()).getTime() - 86400000)) }
  },
  mounted () { this.drawChart() },
  computed: {
    chartData () {
      if (typeof this.month !== 'string') {
        this.month = this.format(this.month)
      }
      let data = new Array(31).fill(0)
      this.$store.state.timeRecords.filter(record => { // 过滤对应年月份的记录
        return (Number.parseInt(record.year) ===
          Number.parseInt(this.month.split('-')[0]) &&
          Number.parseInt(record.month) ===
          Number.parseInt(this.month.split('-')[1]))
      }).forEach(record => { // 计算每一天的总时间
        record.items.forEach(item => {
          data[Number.parseInt(record.date) - 1] += Number.parseFloat(item.time)
        })
      })
      for (let i = 0; i < data.length; ++i) { data[i] = data[i].toFixed(1) }
      return data
    },
    totalTime () { // 本月总的时间支出
      let total = 0
      this.chartData.forEach(data => (total += Number.parseFloat(data)))
      return total.toFixed(1)
    }
  },
  methods: {
    format (date) { // 格式化年月份，2017-01
      let month = date.getMonth() + 1
      if (month < 10) month = '0' + month
      return date.getFullYear() + '-' + month
    },
    drawChart () {
      let option = {// 渲染柱形图的配置
        title: {
          text: '月份时间统计',
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
          data: new Array(31).fill(0).map((v, i) => i + 1),
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
          max: 24,
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
      let chart = Echarts.init(document.querySelector('#bar-chart-month'))
      chart.setOption(option)
    }
  }
}
</script>

<style lang="sass">
#time-analysis-per-month
  width: 100%
  #bar-chart-month
    width: 100%
    height: 240px
</style>