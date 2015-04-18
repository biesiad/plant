var tessel = require('tessel')
var request = require('superagent')
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);

var onReady = function () {
  console.log('Ambient ready')
  setInterval(read, 1000);
}

var read = function () {
  ambient.getLightLevel( function(err, light) {
    if (err) throw err;
    console.log("Light level:", light.toFixed(8));

    var message = {
      type: "light",
      value: light.toFixed(8)
    }

    request
      .post('http://plant.ngrok.com/api/publish/datapoint')
      .send({ channel: "plant:datapoint", message: message })
      .end(function (err, res) {
        if (err) throw err;
        console.log("Light level sent");
      })
    })
  });
}

ambient.on('ready', onReady)
