var express = require('express')
var router = express.Router()
var dataPoints = require('./data-points')
var publish = require('./publish')

router.all('/publish/:endpoint', publish)
router.post('/data-point', dataPoints.create)
router.get('/data-points/current', dataPoints.currentData)
router.get('/data-points/:type', dataPoints.byType)

module.exports = router
