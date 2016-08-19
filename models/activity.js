const db = require('./index')
const Sequelize = require('sequelize')
const Place = require('./place')

var Activity = db.define('activity', activitySchema, activityOptions)

var activitySchema = {}
activitySchema.name = {type: Sequelize.STRING, allowNull: false}
activitySchema.age_range = {type: Sequelize.STRING}

var activityOptions = {}

Activity.belongsTo(Place)

module.exports = Activity
