<template lang="jade">
div#management
  el-row(:gutter="20")
    el-col(:span="10", :offset="2")
      time-analysis-per-month
      time-analysis-per-year
    el-col(:span="9", :offset="1")
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
  padding-top: 30px
  .el-card
    background-color: rgba(0,0,0,0.2)
</style>