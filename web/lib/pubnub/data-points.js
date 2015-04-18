var DataPoint = require('../models/DataPoint')
var debug = require('debug')('plant:pubnub:data-points')
var pubnub = require('./pubnub')

debug('listening for data points on the "plant:datapoint" channel.')
pubnub.subscribe({
  channel: 'plant:datapoint',
  callback: function (data) {
    debug('saving data points: %s', JSON.stringify(data))
    var point = new DataPoint(data)
    point.save(function (err) {
      if (err) return debug('ERROR failed saving data point: %s', err.message)
    })
  }
})
