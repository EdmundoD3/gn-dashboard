//ac accumulator, cv current value

const sqlData={
  set: ({ac,cv,index,object,condition})=>!index?
    `${ac} ${cv} = '${object[cv]}' ` : `${ac}${condition} ${cv} = '${object[cv]}' `,
  values: ({ac,cv,index,object})=>!index?
    `${ac} '${object[cv]}' ` : `${ac}, '${object[cv]}' `,
  names:({ac,cv,index})=>!index?`${ac} '${cv}' ` : `${ac}, '${cv}' `
}

const sqlUpdate = ({setData,nameOfTable})=>Object.keys(setData).reduce((ac,cv,index)=> 
      sqlData.set({ac,cv,index,object:setData,condition:','}),`UPDATE ${nameOfTable} SET `)

const sqlWhere =({where,condition})=> Object.keys(where).reduce((ac,cv,index)=> 
sqlData.set({ac,cv,index,object:where,condition}),`WHERE `)

const sqlInsert=({setData,nameOfTable})=>Object.keys(setData).reduce((ac,cv,index)=> sqlData.names({ac,cv,index}),
`INSERT INTO ${nameOfTable} (`)+')'
const sqlValues = ({setData}) => Object.keys(setData).reduce((ac,cv,index)=> sqlData.values({ac,cv,index,object:setData})
  ,`VALUES (`)+');'

const sqlStatementForObjects=(nameOfTable)=>{
  //insert statement for sql data
  const insertSqlData=({setData={}}) =>{
    const insert = sqlInsert({setData,nameOfTable})
    const values = sqlValues({setData})
    return `${insert} ${values}`
  }
  //update statement for sql data
  const updateSqlData=({setData={},where={},condition='and'}) =>{
    const update = sqlUpdate({setData,nameOfTable})
    const whereUpdate = sqlWhere({where,condition})
    return `${update} ${whereUpdate})`
  }
  //delete statement for sql data
  const deleteSqlData=({where={},condition='and'}) =>{
    const deleteStatement = `DELETE FROM ${nameOfTable} `
    const whereUpdate = sqlWhere({where,condition})
    return `${deleteStatement} ${whereUpdate})`
  }
  //select statement for sql data
  const selectSqlData=({where={},condition='and'}) =>{
    const deleteStatement = `DELETE FROM ${nameOfTable} `
    const whereUpdate = sqlWhere({where,condition})
    return `${deleteStatement} ${whereUpdate})`
  }
  return{
    insert:insertSqlData,
    update:updateSqlData,
    delete:deleteSqlData,
    select:selectSqlData
  }
}

module.exports = {sqlStatementForObjects}