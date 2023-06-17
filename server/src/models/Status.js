const { status : table } = require('../sql/tables.js')

const { CRUDForTablesWhitTwoRows : CRUD } = require('../sql/modules')

const Status = CRUD({ nameOfTable: 'status', table })

module.exports = Status