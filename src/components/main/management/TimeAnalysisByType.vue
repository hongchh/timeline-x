<template lang="jade">
div#time-analysis-by-type
  div#pie-chart
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-by-type',
  mounted () {
    let option = {
      title: {
        text: '分类时间统计',
        subtext: '单位：小时',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '10%',
        top: '5%',
        data: ['学习', '运动', '休闲', '娱乐', '工作']
      },
      series: [{
        name: '时间比重',
        type: 'pie',
        radius: '55%',
        center: ['50%', '70%'],
        data: [
          { value: 335, name: '学习' },
          { value: 310, name: '运动' },
          { value: 234, name: '休闲' },
          { value: 135, name: '娱乐' },
          { value: 1548, name: '工作' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }

    let chart = Echarts.init(document.querySelector('#pie-chart'))
    // TODO: 根据父组件传入的数据进行相关的分析展示
    chart.setOption(option)
  }
}
</script>

<style lang="sass">
#time-analysis-by-type
  width: 100%
  height: 650px
  background: white
  padding-top: 10px
  border: 1px solid rgba(0, 0, 0, 0.3)
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3)
  #pie-chart
    width: 100%
    height: 100%
</style>