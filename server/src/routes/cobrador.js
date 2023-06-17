const Cobrador = require('../models/Cobrador')
const { routersForOneData } = require('./modules')

const router = routersForOneData({ modelsFunction: Cobrador })
module.exports = router;