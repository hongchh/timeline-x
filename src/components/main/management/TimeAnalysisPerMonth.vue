<template lang="jade">
div#time-analysis-per-month
  el-card
    div#bar-chart-month
    el-row(:gutter="20")
      el-col(:span="6", :offset="3")
        el-date-picker(v-model="month", type="month", placeholder="选择月份", @change="drawChart")
      el-col(:span="5", :offset="1")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="5", :offset="1")
        el-input(:value="'AVG: ' + (totalTime / chartData.filter(x => x!== 0).length)", :disabled="true", placeholder="AVG:")
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
    // 获取选中的年月份的记录并计算每天的总时间
    chartData () {
      if (typeof this.month !== 'string') {
        this.month = this.format(this.month)
      }
      let data = new Array(31).fill(0)
      this.$store.state.timeRecords.filter(record => {
        return (record.year === this.month.split('-')[0] &&
          record.month === this.month.split('-')[1])
      }).forEach(record => {
        record.items.forEach(item => {
          data[Number.parseInt(record.date) - 1] += Number.parseFloat(item.time)
        })
      })
      return data
    },
    // 本月总的时间支出
    totalTime () {
      let total = 0
      this.chartData.forEach(data => (total += data.value))
      return total
    }
  },
  methods: {
    format (date) {
      let month = date.getMonth() + 1
      if (month < 10) month = '0' + month
      return date.getFullYear() + '-' + month
    },
    drawChart () {
      let option = {// 渲染柱形图的配置
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
          data: new Array(31).fill(0).map((v, i) => i + 1),
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
    height: 320px
</style>