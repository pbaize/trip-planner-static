const db = require('./index')
const Sequelize = require('sequelize')
const Place = require('./place')

var Hotel = db.define('hotel', hotelSchema, hotelOptions)

var hotelSchema = {}
hotelSchema.name = {type: Sequelize.STRING, allowNull: false}
hotelSchema.num_stars = {type: Sequelize.ENUM(1, 2, 3, 4, 5)}
hotelSchema.amenities = {type: Sequelize.STRING}

var hotelOptions = {}
hotelOptions.setterMethods = {
  amenities: db.makeSetter('amenities')
}

Hotel.belongsTo(Place)

module.exports = Hotel
