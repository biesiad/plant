var tessel = require('tessel'); // import tessel

var keys = require("./../keys")
var pubnub = require("pubnub-hackathon").init({
    publish_key: keys.pubnub.publish,
    subscribe_key: keys.pubnub.subscribe
});

var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['D']);

var onReady = function () {
  console.log("Climate ready")
  setInterval(read, 1000)
}

var read = function () {
  climate.readTemperature('c', onTemperatureRead)
  climate.readHumidity(onHumidityRead)
}

onTemperatureRead = function (err, temperature) {
  if (err) throw err;
  console.log('Degrees:', temperature.toFixed(4) + 'F')

  var message = {
    type: "temperature",
    value: temperature.toFixed(4)
  }
  pubnub.publish({ channel: "plant:datapoint", message: message })
}

onHumidityRead = function (err, humidity) {
  if (err) throw err;
  console.log('Humidity:', humidity.toFixed(4) + '%RH')

  var message = {
    type: "humidity",
    value: humidity.toFixed(4)
  }
  pubnub.publish({ channel: "plant:datapoint", message: message })
}

climate.on('ready', onReady)
