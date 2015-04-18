var moment = require('moment')

<panel>
  <div class="{ title }">
    <h3>{ title }</h3>
    <h5>{ readableDate() }</h5>
    <h2>{ value }</h2>
  <div>
  var self = this
  this.readableDate = function () {
    return moment(self.time).fromNow()
  }
</panel>
