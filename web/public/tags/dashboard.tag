var pubnub = require('../javascripts/lib/pubnub')
var request = require('superagent')


<dashboard>

  <header></header>

  <panel each='{ panels() }' data='{ this }' onclick={ panelSelected.bind(null, this.title) }></panel>

  <footer></footer>

  var self = this
  panelSelected = function(type) {
    window.location.href = '/' + type
  }
  this.panels = function(){
    return Object.keys(self.dataTypes).map(function(type) {
      var d = self.dataTypes[type]
      d.title = type
      return d
    })
  }
  this.dataTypes = {}
  this.on('mount', function() {
    console.log('subscribing to plant:datapoint updates')
    pubnub.subscribe({
      channel: 'plant:datapoint',
      callback: function(data) {
        self.dataTypes[data.type] = {
          value: data.value,
          time: new Date()
        }
        self.update()
      }
    })
  })

  // bootstrap our data
  request
    .get('/api/data-points/current')
    .end(function(err, res) {
      if (err) throw err
      self.dataTypes = res.body
      self.update()
    })

</dashboard>
