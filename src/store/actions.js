import axios from 'axios'

export default {
  unlockScreen ({commit}, password) { // 验证密码，接触锁屏
    // 使用"npm run dev"启动时候请解除下面代码的注释，注释后面的POST代码
    // return new Promise((resolve, reject) => {
    //   commit('UNLOCK')
    //   resolve(false)
    // })
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
    // 使用"npm run dev"启动时候请解除下面代码的注释，注释后面的POST代码
    // return new Promise((resolve, reject) => {
    //   commit('UPDATE_RECORD', record)
    //   resolve(false)
    // })
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
    axios.get('/static/data/data.json').then((res) => {
      if (res.status === 200) {
        commit('FATCH_DATA', res.data)
      }
    })
  }
}
