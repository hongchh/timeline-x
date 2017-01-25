<template lang="jade">
div#time-analysis-per-year
  el-card
    div#bar-chart-year
    el-row(:gutter="20")
      el-col(:span="6", :offset="3")
        el-date-picker(v-model="year", type="year", placeholder="选择年份", @change="drawChart")
      el-col(:span="5", :offset="1")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="5", :offset="1")
        el-input(:value="'AVG: ' + (totalTime / (chartData.filter(x => x!== 0).length)).toFixed(1)", :disabled="true", placeholder="AVG:")
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
    // 获取选中的年份的记录并计算每月的总时间
    chartData () {
      if (typeof this.year !== 'string') {
        this.year = this.year.getFullYear().toString()
      }
      let data = new Array(12).fill(0)
      this.$store.state.timeRecords.filter(record => {
        return Number.parseInt(record.year) === Number.parseInt(this.year)
      }).forEach(record => {
        record.items.forEach(item => {
          data[Number.parseInt(record.month) - 1] += Number.parseFloat(item.time)
        })
      })
      return data
    },
    // 本年总的时间支出
    totalTime () {
      let total = 0
      this.chartData.forEach(data => (total += data))
      return total.toFixed(1)
    }
  },
  methods: {
    drawChart () {
      let option = {// 渲染柱形图的配置
        title: {
          text: '每月时间统计',
          subtext: '单位：小时',
          x: '5%',
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
            inside: true,
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
  margin-top: 20px
  width: 100%
  #bar-chart-year
    width: 100%
    height: 320px
</style>