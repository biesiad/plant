var pubnub = require('../../lib/pubnub/pubnub')
var debug = require('debug')('plant:pubnub:publish')
var async = require('async')

var publish = function (req, res, next) {
  if (!req.body) return res.status(406).json({error: 'payload is required.'})
  var data = req.body || req.query

  console.log('received request to push', data)

  var pub = function (message, done) {
    pubnub.publish({
      channel: 'plant:' + req.params.endpoint,
      message: message,
      callback: function (m) {
        debug('published message %s. (%s)', JSON.stringify(message), JSON.stringify(m))
        if (done) done(null, m)
      }
    })
  }

  if (Array.isArray(data)) {
    async.forEach(data, pub, function (m) {
      res.json({response: m})
    })
  } else {
    pub(data, function (m) {
      res.json({response: m})
    })
  }
}

module.exports = publish
