export default {
  UNLOCK (state) {
    state.lockScreen = false
  },

  LOCK (state) {
    state.lockScreen = true
  },

  ADD_RECORD (state, record) {
    state.timeRecords.push(record)
  },

  UPDATE_RECORD (state, record, i) {
    state.timeRecords[i] = record
  }
}
