<template lang="jade">
div#time-analysis-by-type
  el-card
    div#pie-chart
    el-row(:gutter="20")
      el-col(:span="7", :offset="2")
        el-date-picker(v-model="month", type="month", placeholder="选择月份", @change="drawChart")
      el-col(:span="5", :offset="1")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
      el-col(:span="5", :offset="1")
        el-input(:value="'AVG: ' + (totalTime / 5)", :disabled="true", placeholder="AVG:")
</template>

<script>
import Echarts from 'echarts/lib/echarts'

export default {
  name: 'time-analysis-by-type',
  data () {
    // 按照昨天来设置默认年月份，因为今天的时间可能还没有记录
    return { month: this.format(new Date((new Date()).getTime() - 86400000)) }
  },
  mounted () { this.drawChart() },
  computed: {
    // 填充图表的数据
    chartData () {
      if (typeof this.month !== 'string') {
        this.month = this.format(this.month)
      }
      let data = {
        '学习': {
          value: 0,
          name: '学习',
          itemStyle: { normal: { color: '#c5ef84' } }
        },
        '工作': {
          value: 0,
          name: '工作',
          itemStyle: { normal: { color: '#f9ba2c' } }
        },
        '运动': {
          value: 0,
          name: '运动',
          itemStyle: { normal: { color: '#3aecf5' } }
        },
        '休闲': {
          value: 0,
          name: '休闲',
          itemStyle: { normal: { color: '#68f53a' } }
        },
        '娱乐': {
          value: 0,
          name: '娱乐',
          itemStyle: { normal: { color: '#e0a6f3' } }
        }
      }
      this.$store.state.timeRecords.filter(record => {
        return (Number.parseInt(record.year) ===
          Number.parseInt(this.month.split('-')[0]) &&
          Number.parseInt(record.month) ===
          Number.parseInt(this.month.split('-')[1]))
      }).forEach(record => {
        record.items.forEach(item => {
          data[item.type].value += Number.parseFloat(item.time)
        })
      })
      return Object.values(data)
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
    drawChart (val) {
      let option = {// 渲染圆饼图的配置
        title: {
          text: '分类时间统计',
          subtext: '单位：小时',
          x: 'center',
          textStyle: {
            color: 'white'
          },
          subtextStyle: {
            color: 'white'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 小时 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '10%',
          top: '5%',
          data: ['学习', '工作', '运动', '休闲', '娱乐'],
          textStyle: {
            color: 'white'
          }
        },
        series: [{
          name: '时间比重',
          type: 'pie',
          radius: '60%',
          center: ['50%', '55%'],
          data: this.chartData,
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
      chart.setOption(option)
    }
  }
}
</script>

<style lang="sass">
#time-analysis-by-type
  width: 100%
  #pie-chart
    width: 100%
    height: 520px
</style>