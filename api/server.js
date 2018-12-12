const express = require('express')
const bodyParser = require('body-parser')
const boxen = require('boxen')
const cors = require('cors')
const fileUpload = require('express-fileupload')
var morgan = require('morgan')
const app = express()

// CORS
app.use(cors());
app.options('*', cors());

// Config
const config = require('./config/config.json')

// Startup log
console.log(boxen('ClassicGameDB API', {
  padding: {
    left: 20,
    right: 20,
    top: 1,
    bottom: 1
  },
  margin: 1,
  borderStyle: 'double'
}))

// Mongoose
var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO || config.databases.mongo, {
  useNewUrlParser: true
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'Could not connect to ' + process.env.MONGO || config.databases.mongo + ": "))

db.once('open', function () {
  console.log('Mongoose: Connected to Mongo Database: ' + process.env.MONGO || config.databases.mongo)
  db.db.stats(function (err, stats) {
    console.log(stats);
  })
})

// Use
app.use(fileUpload())
app.use(bodyParser.json({
  limit: '25mb',
  extended: true
}))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

// Route Imports
const gameroutes = require('./routes/game.routes')
const userroutes = require('./routes/user.routes')
const experienceroutes = require('./routes/experience.routes')
const platformroutes = require('./routes/platform.routes')

// Routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/games', gameroutes)
app.use('/games', experienceroutes)
app.use('/users', userroutes)
app.use('/platforms', platformroutes)

// Catch 404's
app.use('*', function (req, res) {
  res.status('404').json("Not found").end()
})

// Listen on port
var server = app.listen(process.env.PORT || config.port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Express: Listening on port: " + port)
})

module.exports = {
  app
}