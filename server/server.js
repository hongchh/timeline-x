let http = require('http')
let app = require('./app')
let port = '8080'

app.set('port', port)
http.createServer(app).listen(port)

console.log(" > server start to listen at localhost:" + port)
