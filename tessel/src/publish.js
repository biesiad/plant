// var request = require('superagent')

// var queue = []

// setInterval(function() {
//
//   var url = 'http://plant.ngrok.com/api/publish/datapoint'
//
//   request
//     .post(url)
//     .send(queue)
//     .timeout(4000)
//     .end(function (err) {
//       if (err) return console.error('error publishing:', err.message)
//       console.log("completed publish.")
//     })
//   queue = []
// }, 5000);

module.exports = function(type, value){
  // queue.push({type: type, value: value, time: new Date().valueOf() })
}
