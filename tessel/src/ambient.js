var tessel = require('tessel'); // import tessel

var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);

var onReady = function () {
  console.log('Ambient ready')
  setInterval(read, 1000);
}

var read = function () {
  ambient.getLightLevel( function(err, ldata) {
    if (err) throw err;
    console.log("Light level:", ldata.toFixed(8));
  });
}

ambient.on('ready', onReady)
