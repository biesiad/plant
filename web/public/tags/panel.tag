var moment = require('moment')

<panel>
  <div class="panel { title }">
    <div class="icon"></div>
    <div class="info">
      <span class="value">{ userValue() }</span><br>
      <span class="title">{ title }</span>
    </div>
  <div>
  var self = this
  this.readableDate = function () {
    return moment(self.time).fromNow()
  }
  this.userValue = function () {
    switch(self.title) {
      case 'light':
        return self.value < 0.1
               ? 'dark'
               :self.value < 0.2
               ? 'dim'
               :self.value < 0.5
               ? 'dusk'
               :self.value < 0.7
               ? 'light'
               :self.value < 0.8
               ? 'bright'
               : 'very bright'
      case 'humidity':
        return Math.round(self.value) + '%'
      case 'moisture':
        return Math.round((self.value * 1.1) * 0.1) + '%'
      case 'temperature':
        return Math.round(self.value) + ' C'
    }
  }
  var redrawInterval = setInterval(function () {
    self.update()
  })
  this.on('unmount', function () {
    clearInterval(redrawInterval)
  })
</panel>
