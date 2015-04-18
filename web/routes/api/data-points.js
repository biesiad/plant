var DataPoint = require('../../lib/models/DataPoint')
var async = require('async')
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
    .sort({time: 1})
    .limit(limit)
    .exec(function (err, points) {
      if (err) return res.status(500).json({error: err.message})
      return res.json({points: points})
    })
}

dataPoints.currentData = function (req, res, next) {
  var start = req.query.start ? new Date(req.query.start) : new Date()
  DataPoint.distinct('type', function (err, types) {
    if (err) return res.status(500).json({error: err.message})
    async.map(types, function (type, done) {
      DataPoint
        .find({type: type, time: {$lte: start}})
        .limit(1)
        .exec(function (err, points) {
          if (err) return done(err)
          done(err, points)
        })
    }, function (err, points) {
      if (err) return res.status(500).json({error: err.message})
      var r = {}
      types.forEach(function (n, idx) {
        r[n] = points[idx][0]
      })
      res.json(r)
    })
  })
}

module.exports = dataPoints
