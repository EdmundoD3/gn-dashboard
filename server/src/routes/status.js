const Status = require('../models/Status')
const {routersForOneData} = require('./modules')

const router = routersForOneData({ nameOfvalue: 'status', modelsFunction: Status })
module.exports = router;