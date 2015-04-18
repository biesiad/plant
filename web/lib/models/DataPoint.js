var mongoose = require('../mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  type: { type: String, index: true },
  value: Number,
  time: { type: Date, default: Date.now },
  meta: Schema.Types.Mixed
})
var DataPoint = mongoose.model('DataPoint', schema)

module.exports = DataPoint
