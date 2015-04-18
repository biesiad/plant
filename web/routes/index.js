var express = require('express')
var router = express.Router()

/* GET dashboard. */

router.get('/', function (req, res) {
  res.render('index', { title: 'dashboard' })
})

/* GET chart */
router.get('/:type', function (req, res) {
  res.render('graph', { title: req.params.type })
})

module.exports = router
