var pubnub = require('../../lib/pubnub/pubnub')
var debug = require('debug')('plant:pubnub:publish')

var publish = function (req, res, next) {
  if (!req.body) return res.status(406).json({error: 'payload is required.'})
  pubnub.publish({
    channel: 'plant:' + req.params.endpoint,
    message: req.body,
    callback: function (m) {
      debug('published message %s. (%s)', JSON.stringify(req.body), JSON.stringify(m))
      res.json({response: m})
    }
  })
}

module.exports = publish
