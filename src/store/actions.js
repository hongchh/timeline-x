import axios from 'axios'

export default {
  unlockScreen ({commit}, password) { // 验证密码，接触锁屏
    return axios.post('/api/check', {
      password: password
    }).then((res) => {
      if (!res || res.status !== 200 || res.data.err) {
        return true
      } else {
        commit('UNLOCK')
        return false
      }
    })
  },

  addRecord ({commit}, record) { // 添加记录
    return axios.post('/api/add', record).then((res) => {
      if (!res || res.status !== 200 || res.data.err) {
        return true
      } else {
        commit('UPDATE_RECORD', record)
        return false
      }
    })
  },

  fatchData ({commit}) { // 获取数据
    axios.get('/api/records').then((res) => {
      if (res.status === 200) {
        commit('FATCH_DATA', res.data)
      }
    })
  }
}
