var pubnub = require('./lib/pubnub/pubnub')
var spawn = require('child_process').spawn

var tessel = spawn('tessel', ['run', '../tessel/index.js'], { stdio: ['pipe', 'pipe', process.stderr] })

var pattern = /([\w\s]+):\s([\d\.]+)/
tessel.stdout.on('data', function (data) {
  var str = data.toString()
  var m = str.match(pattern)
  if (m) {
    var type = m[1].toLowerCase().trim()
    var value = m[2].trim()
    console.log('updating', type, value)
    pubnub.publish({
      channel: 'plant:datapoint',
      message: {type: type, value: value}
    })
  }
})
