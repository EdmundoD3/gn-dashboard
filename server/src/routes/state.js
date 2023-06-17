const State = require('../models/State')
const {routersForOneData} = require('./modules')

const router = routersForOneData({ modelsFunction: State })
module.exports = router;