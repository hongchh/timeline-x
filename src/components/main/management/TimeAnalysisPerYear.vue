<template lang="jade">
div#time-analysis-per-year
  div#bar-chart-year
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-per-year',
  mounted () {
    let data = []
    let dataAxis = []
    let dataShadow = []
    const yMax = 744
    for (let i = 0; i < 12; ++i) {
      data.push(Math.random() * 744)
      dataAxis.push(i + 1)
      dataShadow.push(yMax)
    }
    let option = {
      title: {
        text: '每年时间统计',
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

    let chart = Echarts.init(document.querySelector('#bar-chart-year'))
    // TODO: 根据父组件传入的数据进行相关的分析展示
    chart.setOption(option)
  }
}
</script>

<style lang="sass">
#time-analysis-per-year
  margin-top: 20px
  width: 100%
  height: 300px
  background: white
  padding-top: 10px
  border: 1px solid rgba(0, 0, 0, 0.3)
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3)
  #bar-chart-year
    width: 100%
    height: 100%
</style>