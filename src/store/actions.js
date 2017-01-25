import axios from 'axios'

export default {
  unlockScreen ({commit}, password) {
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

  addRecord ({commit}, record) {
    return axios.post('/api/add', record).then((res) => {
      if (!res || res.status !== 200 || res.data.err) {
        return true
      } else {
        commit('UPDATE_RECORD', record)
        return false
      }
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
