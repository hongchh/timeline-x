let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let FileStore = require('session-file-store')(session)
let history = require('connect-history-api-fallback')
let controller = require('./controller')

let app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  store: new FileStore(),
  secret: 'hongchh',
  resave: false,
  saveUninitialized: false
}));
app.use(history())
app.use('/static', express.static(path.join(__dirname, './static')))
app.use('/', controller)

module.exports = app