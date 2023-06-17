const { city: table } = require('../sql/tables.js') 
const { CRUDForTablesWhitTwoRows: CRUD } = require('../sql/modules') 
const City = CRUD({ nameOfTable: 'city', table })

module.exports = City
