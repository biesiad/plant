var tessel = require('tessel')
var gpio = tessel.port['GPIO']
var publish = require('./publish')
var constants = require('./constants')

setInterval(function () {
  var pin = gpio.analog[5]
  var moisture = pin.read() * pin.resolution
  console.log('Moisture:', moisture, '/', pin.resolution)

  publish('moisture', moisture)
}, constants.publishInterval)
