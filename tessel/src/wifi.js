var wifi = require('wifi-cc3000')
var network = 'pubnub-ac'
var pass = 'pubnub.com'
var security = 'wpa2'
var timeouts = 0

var connect = function (cb) {
  if (!wifi.isConnected()) {
    wifi.connect({
      security: security,
      ssid: network,
      password: pass,
      timeout: 30
    })
    var check = setInterval(function () {
      if (wifi.isConnected() && cb) {
        cb(wifi.connection())
        clearInterval(check)
      } else {
        console.log('not connected to wifi...')
      }
    }, 1000)
  } else {
    cb(wifi.connection())
  }
}

// reset the wifi chip progammatically
var powerCycle = function () {
  // when the wifi chip resets, it will automatically try to reconnect
  // to the last saved network
  wifi.reset(function () {
    timeouts = 0 // reset timeouts
    console.log('done power cycling')
    // give it some time to auto reconnect
    setTimeout(function () {
      if (!wifi.isConnected()) {
        // try to reconnect
        connect()
      }
    }, 20 * 1000) // 20 second wait
  })
}

wifi.on('connect', function (data) {
  // you're connected
  console.log('connect emitted', data)
})

wifi.on('disconnect', function (data) {
  // wifi dropped, probably want to call connect() again
  console.log('disconnect emitted', data)
})

wifi.on('timeout', function (err) {
  // tried to connect but couldn't, retry
  console.log('timeout emitted %s', err && err.message)
  timeouts++
  if (timeouts > 2) {
    // reset the wifi chip if we've timed out too many times
    powerCycle()
  } else {
    // try to reconnect
    connect()
  }
})

wifi.on('error', function (err) {
  // one of the following happened
  // 1. tried to disconnect while not connected
  // 2. tried to disconnect while in the middle of trying to connect
  // 3. tried to initialize a connection without first waiting for a timeout or a disconnect
  console.log('error emitted', err)
})

module.exports = connect
