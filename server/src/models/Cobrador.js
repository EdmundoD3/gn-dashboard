const { cobrador : table } = require('../sql/tables.js')

const { CRUDForTablesWhitTwoRows : CRUD } = require('../sql/modules')

const Cobrador = CRUD({ nameOfTable: 'cobrador', table })

module.exports = Cobrador
