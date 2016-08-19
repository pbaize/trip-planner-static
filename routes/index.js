const express = require('express')
const router = express.Router()
const models = require('../models')

module.exports = router

router.get('/', function (req, res, next) {
  res.render('../views/layout.html')
})
