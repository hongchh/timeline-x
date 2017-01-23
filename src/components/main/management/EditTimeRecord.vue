<template lang="jade">
div#edit-time-record
  el-card
    el-row(:gutter="20")
      el-col(:span="6")
        h3 编辑时间记录
      el-col(:span="8", :offset="10")
        el-date-picker#edit-time-record-date(v-model="date", type="date", placeholder="选择日期", :editable="false")
    el-row(:gutter="20", v-for="(record, index) in records")
      el-col(:span="1")
        span {{ index + 1 }}.
      el-col(:span="11")
        el-input#content(v-model="record.content", placeholder="内容")
      el-col(:span="5", :offset="1")
        el-input-number(v-model="record.time", :step="0.1", :min="0", :max="24")
      el-col(:span="5", :offset="1")
        el-dropdown(@command="handleCommand")
          span {{ record.type }} <i class="el-icon-caret-bottom el-icon--right"></i>
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(:command="'学习-' + index") 学习
            el-dropdown-item(:command="'工作-' + index") 工作
            el-dropdown-item(:command="'休闲-' + index") 休闲
            el-dropdown-item(:command="'娱乐-' + index") 娱乐
            el-dropdown-item(:command="'运动-' + index") 运动
    el-row(:gutter="20")
      el-col(:span="2", :offset="9")
        el-tooltip(content="添加条目", placement="top")
          el-button(type="primary", icon="plus", @click="addRecord")
      el-col(:span="2")
        el-tooltip(content="删除条目", placement="top")
          el-button(type="primary", icon="minus", @click="removeRecord")
      el-col(:span="2")
        el-tooltip(content="提交记录", placement="top")
          el-button(type="primary", icon="check", @click="submitRecords")

  el-dialog(title="提示:", v-model="dialogVisible", size="tiny")
    span 请选择日期
    span(slot="footer")
      el-button(@click="dialogVisible = false") 确定
</template>

<script>
export default {
  name: 'edit-time-record',
  data () {
    return {
      date: '',
      dialogVisible: false,
      records: [{
        content: '',
        time: '0',
        type: '学习'
      }]
    }
  },
  methods: {
    handleCommand (command) {
      command = command.split('-')
      this.records[command[1]].type = command[0]
    },
    addRecord () {
      this.records.push({
        content: '',
        time: '0',
        type: '学习'
      })
    },
    removeRecord () {
      this.records.pop()
    },
    submitRecords () {
      if (this.date === '') {
        this.dialogVisible = true
      }
      // TODO: 提交记录中的非空记录
      console.log(this.records)
    }
  }
}
</script>

<style lang="sass" scope>
#edit-time-record
  width: 100%
  margin-top: 20px
  .el-row
    margin-bottom: 25px
    .el-col
      span
        display: block
        padding-top: 5px
      #content input
        border: none
        border-bottom: 1px solid black
        border-radius: 0
      .el-input-number
        width: 135px
  .el-row:last-child
    margin-bottom: 0
</style>