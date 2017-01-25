let fs = require('fs')

let dateTime = new Date('2016-08-31')
let types = ['学习', '工作', '运动']
let fakeContent = ['上课', '做作业', '跑步']
let fakeTime = [
  (() => 4 + Math.random() * 4),
  (() => 2 + Math.random() * 6),
  (() => 0.5)
]

let format = (date) => {
  let t = {}
  t.year = date.getFullYear()
  t.month = (date.getMonth() + 1)
  if (t.month < 10) t.month = '0' + t.month
  t.date = date.getDate()
  if (t.date < 10) t.date = '0' + t.date
  t.day = date.getDay()
  return t
}

let data = []

for (let i = 0; i < 145; ++i) {
  dateTime = new Date(dateTime.getTime() + 86400000)
  let t = format(dateTime)
  let items = []
  for (j = 0; j < 3; ++j) {
    items.push({
      content: fakeContent[j],
      time: fakeTime[j]().toFixed(1),
      type: types[j]
    })
  }
  data.push({
    year: t.year,
    month: t.month,
    date: t.date,
    day: t.day,
    items: items
  })
}

fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data.reverse()))