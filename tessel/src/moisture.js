var tessel = require('tessel')
var gpio = tessel.port['GPIO']

var keys = require("./../keys")
var pubnub = require("pubnub-hackathon").init({
    publish_key: keys.pubnub.publish,
    subscribe_key: keys.pubnub.subscribe
});

setInterval(function () {
  var pin = gpio.analog[5]
  var moisture = pin.read() * pin.resolution
  console.log('Moisture:', moisture, '/', pin.resolution)

  var message = {
    type: "moisture",
    value: moisture
  }
  pubnub.publish({ channel: "plant:datapoint", message: message })
}, 1000)
