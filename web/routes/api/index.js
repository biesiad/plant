var express = require('express')
var router = express.Router()
var dataPoints = require('./data-points')

router.post('/data-point', dataPoints.create)
router.get('/data-points/:type', dataPoints.byType)

module.exports = router
