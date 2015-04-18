var tessel = require('tessel'); // import tessel

var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);

var onReady = function () {
  console.log('Ambient ready')
}

ambient.on('ready', onReady)
