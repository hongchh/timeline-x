<template lang="jade">
div#time-analysis-by-type
  el-card
    div#pie-chart
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
  name: 'time-analysis-by-type',
  data () {
    return {
      month: '2017-01',
      totalTime: 'Total: 400h',
      avgTime: 'AVG: 50h'
    }
  },
  mounted () {
    let option = {
      title: {
        text: '分类时间统计',
        subtext: '单位：小时',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} 小时 ({d}%)'
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
        radius: '60%',
        center: ['50%', '55%'],
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
  #pie-chart
    width: 100%
    height: 550px
</style>