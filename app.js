const express = require('express')
const swig = require('swig')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// const models = require('./models')

const app = express()
const router = require('./routes')

app.engine('html', swig.renderFile)
swig.setDefaults({ cache: false })
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/node_modules'))
app.use(express.static(__dirname + '/public'))

// router goes here

app.listen(1337, function () {
  console.log('listening on 1337')
})
app.use(router)
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send(err.message)
})
