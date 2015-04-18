var moment = require('moment')

<panel>
  <div class="panel { title }">
    <div class="icon"></div>
    <div class="info">
      <span class="value">{ value }</span><br>
      <span class="title">{ title }</span>
    </div>
  <div>
  var self = this
  this.readableDate = function () {
    return moment(self.time).fromNow()
  }
</panel>
