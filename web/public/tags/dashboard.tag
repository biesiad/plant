var pubnub = require('pubnub')

<dashboard>
  this.dataTypes = {}
  var self = this
  pubnub.subscribe({
    channel: 'plant:datapoint',
    callback: function(data) {
      self.dataTypes[data.type] = {
        value: data.value,
        time: new Date()
      }
    }
  })
</dashboard>
