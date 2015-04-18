var tessel = require('tessel'); // import tessel
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
}

onHumidityRead = function (err, humidity) {
  if (err) throw err;
  console.log('Humidity:', humidity.toFixed(4) + '%RH')
}

climate.on('ready', onReady)
