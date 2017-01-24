import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lockScreen: true,
    timeRecords: [{
      year: '2017',
      month: '01',
      date: '22',
      day: '星期日',
      items: [{
        content: '开发timeline-x',
        time: '9',
        type: '工作'
      }, {
        content: '跑步',
        time: '0.5',
        type: '运动'
      }]
    }, {
      year: '2017',
      month: '01',
      date: '23',
      day: '星期一',
      items: [{
        content: '开发timeline-x',
        time: '9',
        type: '工作'
      }, {
        content: '跑步',
        time: '0.5',
        type: '运动'
      }]
    }, {
      year: '2017',
      month: '01',
      date: '24',
      day: '星期一',
      items: [{
        content: '开发timeline-x',
        time: '7',
        type: '工作'
      }, {
        content: '跑步',
        time: '0.5',
        type: '运动'
      }]
    }]
  },
  mutations,
  actions
})

export default store
