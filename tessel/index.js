var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port

setInterval(function () {
  var pin = gpio.analog[5]
  console.log('Moisture:', pin.read() * pin.resolution, '/', pin.resolution);
}, 1000);
