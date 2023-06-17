const { state: table } = require('../sql/tables.js')
const { CRUDForTablesWhitTwoRows: CRUD } = require('../sql/modules')

const State = CRUD({ nameOfTable: 'state', table })

module.exports = State
