<template lang="jade">
div#time-analysis-by-type
  el-card
    div#pie-chart
    el-row(:gutter="20")
      el-col(:span="8", :offset="2")
        el-date-picker(v-model="month", type="month", placeholder="选择月份", @change="drawChart")
      el-col(:span="8", :offset="4")
        el-input(:value="'Total: ' + totalTime", :disabled="true", placeholder="Total:")
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
        },
        '其他': {
          value: 0,
          name: '其他',
          itemStyle: { normal: { color: '#e0a6a3' } }
        }
      }
      this.$store.state.timeRecords.filter(record => { // 过滤对应年月份的记录
        return (Number.parseInt(record.year) ===
          Number.parseInt(this.month.split('-')[0]) &&
          Number.parseInt(record.month) ===
          Number.parseInt(this.month.split('-')[1]))
      }).forEach(record => { // 计算每种分类的总时间
        record.items.forEach(item => {
          data[item.type].value += Number.parseFloat(item.time)
        })
      })
      data = Object.values(data)
      data.forEach(d => (d.value = d.value.toFixed(1)))
      return data
    },
    totalTime () { // 本月总的时间支出
      let total = 0
      this.chartData.forEach(data => (total += Number.parseFloat(data.value)))
      return total.toFixed(1)
    }
  },
  methods: {
    format (date) { // 格式化年月，2017-01
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
          left: '5%',
          top: '5%',
          data: ['学习', '工作', '运动', '休闲', '娱乐', '其他'],
          textStyle: {
            color: 'white'
          }
        },
        series: [{
          name: '时间比重',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
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
    height: 400px
</style>