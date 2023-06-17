const Vendedora = require('../models/Vendedora')
const {routersForOneData} = require('./modules')

const router = routersForOneData({ modelsFunction: Vendedora })
module.exports = router;