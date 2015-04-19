var tessel = require('tessel')
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);
var publish = require('./publish')
var constants = require('./constants')

var onReady = function () {
  console.log('Ambient ready')
  setInterval(read, constants.publishInterval);
}

var read = function () {
  ambient.getLightLevel( function(err, light) {
    if (err) throw err;
    console.log("Light:", light.toFixed(8));

    publish('light',light.toFixed(8))
  });
}

ambient.on('ready', onReady)
