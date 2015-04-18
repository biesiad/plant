var tessel = require('tessel')
var gpio = tessel.port['GPIO']

setInterval(function () {
  var pin = gpio.analog[5]
  console.log('Moisture:', pin.read() * pin.resolution, '/', pin.resolution)
}, 1000)
