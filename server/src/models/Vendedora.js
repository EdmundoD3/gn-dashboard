const { vendedora: table } = require('../sql/tables.js')
const { CRUDForTablesWhitTwoRows: CRUD } = require('../sql/modules')

const Vendedora = CRUD({ nameOfTable: 'vendedora', table })
module.exports = Vendedora