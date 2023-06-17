const database = require('../../db/database.js')
const oneData = ({nameOfTable='',table=''})=>{

  return {
    getOne:async ({value,nameValue,limit=10,offset=0}) =>{
      const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE ${nameValue} LIKE '%${value.toLowerCase()}%' LIMIT ${limit} OFFSET ${offset}`
      return await database.get({table:table,sqliteCode:sqliteCode});
    },
    getSpecific:async ({value,nameValue}) =>{
      if(!table)return console.log('insert a table in',nameOfTable)
      const sqliteCode = `SELECT * FROM ${nameOfTable} WHERE ${nameValue} = '${value.toLowerCase()}'`
      return await database.get({table:table,sqliteCode:sqliteCode});
    },
    getLimit: async ({limit=10,offset=0})=> {
      const sqliteCode = `SELECT * FROM ${nameOfTable} ORDER BY id LIMIT ${limit} OFFSET ${offset}`
      return await database.get({table:table,sqliteCode:sqliteCode})
    },
    postOne:  async ({value='',nameValue=''})=>{
      const insert = `INSERT INTO ${nameOfTable} (${nameValue}) VALUES ('${value.toLowerCase()}')`
      return await database.post({table,insert,tableName:`${nameOfTable}`})
    },
    putOneById:async ({id='',value='',nameValue=''})=> {
      const update=`UPDATE ${nameOfTable} SET ${nameValue} = '${value.toLowerCase()}' WHERE id = '${id}' `
      const select=`SELECT * FROM ${nameOfTable} WHERE id = ${id}`
      return await database.put({table:table,update:update,sqliteCode:select})
    },
    putOneByIdChange:async ({id='',value='',nameValue=''})=> {
      const update=`UPDATE ${nameOfTable} SET ${nameValue} = '${value.toLowerCase()}', ischange = 1 WHERE id = '${id}' `
      const select=`SELECT * FROM ${nameOfTable} WHERE id = ${id}`
      return await database.put({table:table,update:update,sqliteCode:select})
    },
    deleteByOneData: async ({value='',nameValue=''})=> {
      const sqliteDelete = `DELETE FROM ${nameOfTable} WHERE ${nameValue} = ${value}`
      return await database.delete({table:table,sqliteDelete:sqliteDelete});
    }
  }
}

module.exports = {oneData}