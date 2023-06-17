const Colonia = require('../models/Colonia')
const { routersForOneData } = require('./modules')

const router = routersForOneData({ modelsFunction: Colonia })
module.exports = router;