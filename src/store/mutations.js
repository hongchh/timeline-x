const int = Number.parseInt

export default {
  UNLOCK (state) {
    state.lockScreen = false
  },

  LOCK (state) {
    state.lockScreen = true
  },

  UPDATE_RECORD (state, newRecord) {
    for (let record of state.timeRecords) {
      if (int(record.year) === int(newRecord.year) &&
        int(record.month) === int(newRecord.month) &&
        int(record.date) === int(newRecord.date)) {
        record = newRecord
        return
      }
    }
    state.timeRecords.push(newRecord)
    state.timeRecords.sort((a, b) => {
      let t1 = new Date(a.year + '-' + a.month + '-' + a.date)
      let t2 = new Date(b.year + '-' + b.month + '-' + b.date)
      if (t1.getTime() < t2.getTime()) return 1
      if (t1.getTime() > t2.getTime()) return -1
      return 0
    })
  },

  FATCH_DATA (state, data) {
    state.timeRecords = data
  }
}
