const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tripplanner')

// -- PLACE MODEL --

var placeSchema = {}
placeSchema.address = {type: Sequelize.STRING, allowNull: false}
placeSchema.city = {type: Sequelize.STRING, allowNull: false}
placeSchema.state = {type: Sequelize.STRING, allowNull: false}
placeSchema.phone = {type: Sequelize.STRING, allowNull: false}
placeSchema.location = {type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false}

var placeOptions = {}

var Place = db.define('place', placeSchema, placeOptions)
// -- HOTEL MODEL --

var hotelSchema = {}
hotelSchema.name = {type: Sequelize.STRING, allowNull: false}
hotelSchema.num_stars = {type: Sequelize.INTEGER}
hotelSchema.amenities = {type: Sequelize.STRING}

var hotelOptions = {}
hotelOptions.getterMethods = {
  amenities: makeSetter('amenities')
}

var Hotel = db.define('hotel', hotelSchema, hotelOptions)

// -- ACTIVITY MODEL --

var activitySchema = {}
activitySchema.name = {type: Sequelize.STRING, allowNull: false}
activitySchema.age_range = {type: Sequelize.STRING}

var activityOptions = {}

var Activity = db.define('activity', activitySchema, activityOptions)

// -- RESTAURANT MODEL --

var restaurantSchema = {}
restaurantSchema.name = {type: Sequelize.STRING, allowNull: false}
restaurantSchema.cuisine = {type: Sequelize.STRING}

restaurantSchema.price = {type: Sequelize.INTEGER}

var restaurantOptions = {}
restaurantOptions.getterMethods = {
  cuisine: makeSetter('cuisine')
}
var Restaurant = db.define('restaurant', restaurantSchema, restaurantOptions)

function makeSetter (columnName) {
  return function (value) {
    var arrayOfTags
    if (typeof value === 'string') {
      arrayOfTags = value.split(',').map(function (s) {
        return s.trim()
      })
      this.setDataValue(columnName, arrayOfTags)
    } else {
      this.setDataValue(columnName, value)
    }
  }
}

// db.sync()

module.exports = {
  dataBase: db,
  Activity: Activity,
  Restaurant: Restaurant,
  Place: Place,
  Hotel: Hotel
}

Hotel.belongsTo(Place)
Restaurant.belongsTo(Place)
Activity.belongsTo(Place)
