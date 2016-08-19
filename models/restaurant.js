const db = require('./index')
const Sequelize = require('sequelize')
const Place = require('./place')

var Restaurant = db.define('restaurant', restaurantSchema, restaurantOptions)

var restaurantSchema = {}
restaurantSchema.name = {type: Sequelize.STRING, allowNull: false}
restaurantSchema.cuisine = {type: Sequelize.STRING}

restaurantSchema.price = {type: Sequelize.ENUM(1, 2, 3, 4, 5)}

var restaurantOptions = {}
restaurantOptions.setterMethods = {
  cuisine: db.makeSetter('cuisine')
}

Restaurant.belongsTo(Place)

module.exports = Restaurant
