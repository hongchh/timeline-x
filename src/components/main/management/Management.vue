<template lang="jade">
div#management
  div#content-wrapper
    el-row(:gutter="10")
      el-col(:span="12", :offset="1")
        time-analysis-per-month
        time-analysis-per-year
      el-col(:span="10")
        time-analysis-by-type
        edit-time-record
</template>

<script>
import EditTimeRecord from './EditTimeRecord'
import TimeAnalysisByType from './TimeAnalysisByType'
import TimeAnalysisPerMonth from './TimeAnalysisPerMonth'
import TimeAnalysisPerYear from './TimeAnalysisPerYear'

export default {
  name: 'management',
  components: {
    EditTimeRecord,
    TimeAnalysisByType,
    TimeAnalysisPerMonth,
    TimeAnalysisPerYear
  }
}
</script>

<style lang="sass">
#management
  width: 100%
  height: 100%
  position: absolute
  #content-wrapper
    width: 100%
    position: absolute
    top: 25px
    .el-card
      background-color: rgba(0,0,0,0.2)
      input
        background-color: transparent
        color: white
.el-picker-panel, .el-dropdown-menu
  background-color: rgba(0,0,0,0.3)
.el-picker-panel, .el-picker-panel button, .el-dropdown, .el-dropdown-menu
  color: white
.el-month-table, .el-year-table, .el-date-table
  td .cell, th
    color: white
  td .cell:hover, td.available:hover
    background-color: #20c1ff
</style>