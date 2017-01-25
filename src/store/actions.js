import axios from 'axios'

export default {
  unlockScreen ({commit}, password) {
    // TODO: 向服务器验证密码
    return new Promise((resolve, reject) => {
      if (password === 'hongchh') {
        commit('UNLOCK')
        resolve()
      } else {
        reject()
      }
    })
  },

  addRecord ({commit}, record) {
    // TODO: 将记录提交到服务器
    return new Promise((resolve, reject) => {
      commit('UPDATE_RECORD', record)
      resolve(false)
    })
  },

  fatchData ({commit}) {
    axios.get('/static/data/data.json').then((res) => {
      if (res.status === 200) {
        commit('FATCH_DATA', res.data)
      }
    })
  }
}
