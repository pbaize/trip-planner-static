const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/trip_planner')

// -- PLACE MODEL --

var Place = db.define('place', placeSchema, placeOptions)

var placeSchema = {}
placeSchema.address = {type: Sequelize.STRING, allowNull: false}
placeSchema.city = {type: Sequelize.STRING, allowNull: false}
placeSchema.state = {type: Sequelize.STRING, allowNull: false}
placeSchema.phone = {type: Sequelize.STRING, allowNull: false}
placeSchema.location = {type: Sequelize.ARRAY(Sequelize.FLOAT), allowNull: false}

var placeOptions = {}

// -- HOTEL MODEL --

var Hotel = db.define('hotel', hotelSchema, hotelOptions)

var hotelSchema = {}
hotelSchema.name = {type: Sequelize.STRING, allowNull: false}
hotelSchema.num_stars = {type: Sequelize.ENUM(1, 2, 3, 4, 5)}
hotelSchema.amenities = {type: Sequelize.STRING}

var hotelOptions = {}
hotelOptions.setterMethods = {
  amenities: makeSetter('amenities')
}

// -- ACTIVITY MODEL --

var Activity = db.define('activity', activitySchema, activityOptions)

var activitySchema = {}
activitySchema.name = {type: Sequelize.STRING, allowNull: false}
activitySchema.age_range = {type: Sequelize.STRING}

var activityOptions = {}

// -- RESTAURANT MODEL --

var Restaurant = db.define('restaurant', restaurantSchema, restaurantOptions)

var restaurantSchema = {}
restaurantSchema.name = {type: Sequelize.STRING, allowNull: false}
restaurantSchema.cuisine = {type: Sequelize.STRING}

restaurantSchema.price = {type: Sequelize.ENUM(1, 2, 3, 4, 5)}

var restaurantOptions = {}
restaurantOptions.setterMethods = {
  cuisine: makeSetter('cuisine')
}

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

Hotel.belongsTo(Place)
Restaurant.belongsTo(Place)
Activity.belongsTo(Place)
