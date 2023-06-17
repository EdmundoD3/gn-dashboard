const { colonia : table } = require('../sql/tables.js')

const { CRUDForTablesWhitTwoRows } = require('../sql/modules')

const Colonia = CRUDForTablesWhitTwoRows({ nameOfTable: 'colonia', table })

module.exports = Colonia