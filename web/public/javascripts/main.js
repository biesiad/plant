var PUBNUB = require('pubnub-browserify')
var keys = require('../../../keys')

var pubnub = PUBNUB.init({
  ssl: true,  // <- enable TLS Tunneling over TCP
  publish_key: keys.pubnub.publish,
  subscribe_key: keys.pubnub.subscribe
})

var message = { "some" : "data" }
pubnub.publish({
    channel   : 'my_channel',
    message   : message,
    callback  : function(e) { console.log( "SUCCESS!", e ); },
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
});

/* ---------------------------------------------------------------------------
Listen for Messages
--------------------------------------------------------------------------- */
pubnub.subscribe({
    channel  : "my_channel",
    callback : function(message) {
        console.log( " > ", message );
    }
});
