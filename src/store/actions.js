export default {
  unlockScreen ({commit}, password) {
    // TODO: 向服务器验证密码
    if (password === 'hongchh') {
      commit('UNLOCK')
    }
  },

  addRecord ({commit}, record) {
    // TODO: 将记录提交到服务器
    commit('ADD_RECORD', record)
  },

  updateRecord ({commit}, record, i) {
    // TODO: 将记录提交到服务器
    commit('UPDATE_RECORD', record, i)
  }
}
