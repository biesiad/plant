var pubnub = require('../javascripts/lib/pubnub')
var Chart = require('chart.js')
var request = require('superagent')
var moment = require('moment')

<graph>
  <div class="graph-container">
    <canvas id="graph"></canvas>
  </div>

  var datapoints = []
  var labels = []
  var title = ''
  var chart

  var drawgraph = function () {
    console.log('drawing graph');
    var color = '#3EB334'
    var data = {
      labels: labels,
      datasets: [
        {
          label: title,
          strokeColor: color,
          pointColor: '#fff',
          pointStrokeColor: color,
          pointHighlightFill: color,
          pointHighlightStroke: '#fff',
          data: datapoints
        }
      ]
    }
    var options = {
      scaleShowGridLines : true,
      bezierCurve : true,
      bezierCurveTension: 0.4,
      pointDot : true,
      pointDotRadius : 4,
      datasetFill : false,
      showScale: true,
      maintainAspectRatio: true,
      responsive: true,
      scaleShowHorizontalLines: false
    }
    var cvs = document.getElementById('graph')
    var ctx = cvs.getContext('2d')
    chart = new Chart(ctx).Line(data, options)
  }

  var refresh = function () {
    var type = window.location.pathname.split('/').slice(-1)
    request
      .get('/api/data-points/' + type)
      .send({
        start: moment().valueOf(),
        end: moment().subtract(24,'hours').valueOf()
      })
      .end(function (err, res) {
        if (err) throw err
        console.log(res.body)
        if (!res.body.points.length) return
        var points = res.body.points
        datapoints = points.map(function(p) { return p.value })
        title = points[0].type
        labels = points.map(function(p) {
          return moment(p.time).format('h:mm a')
        })
        drawgraph()
      })
  }

  this.on('mount', function() {
    console.log('subscribing to plant:datapoint updates')
    pubnub.subscribe({
      channel: 'plant:datapoint',
      callback: function(data) {
        data.time = moment().valueOf()
        if(chart) {
          chart.addData([data.value], moment(data.time).format('h:mm a'))
          // TODO: figure out how to remove values that are before
          // var earliest = moment().subtract(24,'hours')
          chart.removeData()
        } else {
          refresh()
        }
      }
    })
    refresh()
  })


</graph>
