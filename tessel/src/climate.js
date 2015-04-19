var tessel = require('tessel'); // import tessel
var publish = require('./publish')
var constants = require('./constants')

var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['D']);

var onReady = function () {
  console.log("Climate ready")
  setInterval(read, constants.publishInterval)
}

var read = function () {
  climate.readTemperature('c', onTemperatureRead)
  climate.readHumidity(onHumidityRead)
}

onTemperatureRead = function (err, temperature) {
  if (err) throw err;
  console.log('Temperature:', temperature.toFixed(4) + 'F')
  publish('temperature', temperature.toFixed(4))
}

onHumidityRead = function (err, humidity) {
  if (err) throw err;
  console.log('Humidity:', humidity.toFixed(4) + '%RH')
  publish('humidity', humidity.toFixed(4))
}

climate.on('ready', onReady)
