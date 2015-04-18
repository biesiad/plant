var tessel = require('tessel')

var keys = require("./../keys")
var pubnub = require("pubnub-hackathon").init({
    publish_key: keys.pubnub.publish,
    subscribe_key: keys.pubnub.subscribe
});

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
    pubnub.publish({ channel: "plant:datapoint", message: message })
  });
}

ambient.on('ready', onReady)
