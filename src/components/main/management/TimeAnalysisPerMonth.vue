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
      totalTime: 'Total: 400h',
      avgTime: 'AVG: 50h'
    }
  },
  mounted () {
    let data = []
    let dataAxis = []
    let dataShadow = []
    const yMax = 24
    for (let i = 0; i < 31; ++i) {
      data.push(Math.random() * 24)
      dataAxis.push(i + 1)
      dataShadow.push(yMax)
    }
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
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { textStyle: { color: '#999' } }
      },
      dataZoom: [{ type: 'inside' }],
      series: [{
        type: 'bar',
        itemStyle: { normal: {color: 'rgba(0,0,0,0.05)'} },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: dataShadow,
        animation: false
      }, {
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
    // TODO: 根据父组件传入的数据进行相关的分析展示
    chart.setOption(option)
  }
}
</script>

<style lang="sass">
#time-analysis-per-month
  width: 100%
  #bar-chart-month
    width: 100%
    height: 300px
</style>