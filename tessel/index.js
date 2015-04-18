
require('./src/wifi')(function() {
  var moisture = require('./src/moisture')
  var climate = require('./src/climate')
  var ambient = require('./src/ambient')
})
