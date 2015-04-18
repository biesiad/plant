var keys = {}
try {
  keys = require('../../keys')
} catch (err) {}

var config = keys

config.pubnub = config.pubnub || {
  publish: process.env.PUBNUB_PUBLISH_KEY,
  subscribe: process.env.PUBNUB_SUBSCRIBE_KEY
}

module.exports = config
