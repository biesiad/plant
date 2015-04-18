var DataPoint = require('../../lib/models/DataPoint')
var dataPoints = {}

dataPoints.create = function (req, res, next) {
  var point = new DataPoint(req.body)
  point.save(function (err) {
    if (err) return res.status(406).json({error: err.message})
    res.json(point)
  })
}

dataPoints.byType = function (req, res, next) {
  var limit = req.query.limit || 20
  var start = req.query.start ? new Date(req.query.start) : new Date()
  DataPoint
    .find({type: req.params.type, time: {$lte: start}})
    .sort({time: -1})
    .limit(limit)
    .exec(function (err, points) {
      if (err) throw err
      if (err) return res.status(500).json({error: err.message})
      return res.json({points: points})
    })
}

module.exports = dataPoints
