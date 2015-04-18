var PUBNUB = require('pubnub-browserify')
var config = require('../../config')

var pubnub = PUBNUB.init({
  ssl: true,  // <- enable TLS Tunneling over TCP
  publish_key: config.pubnub.publish,
  subscribe_key: config.pubnub.subscribe
})

module.exports = pubnub
