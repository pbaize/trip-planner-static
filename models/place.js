const db = require('./index')
const Sequelize = require('sequelize')

var Place = db.define('place', placeSchema, placeOptions)

var placeSchema = {}
placeSchema.address = {type: Sequelize.STRING, allowNull: false}
placeSchema.city = {type: Sequelize.STRING, allowNull: false}
placeSchema.state = {type: Sequelize.STRING, allowNull: false}
placeSchema.phone = {type: Sequelize.STRING, allowNull: false}
placeSchema.location = {type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false}

var placeOptions = {}

module.exports = Place
