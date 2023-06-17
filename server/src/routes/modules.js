const isString = (str) => typeof (str) === 'string'
const CRUDMetodForOneData = ({ modelsFunction }) => {
  const nameOfvalue = modelsFunction.nameOfTable
  return {
    getsForOneData: async (req, res) => {
      const value = req.query[nameOfvalue] || ''
      if (!isString(value)) return res.status(403).json({ error: `${nameOfvalue} is not string` })
      try {
        const response = await modelsFunction.getByName({ value })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error })
      }
    },
    postForOneData: async (req, res) => {
      const value = req.body[nameOfvalue]
      if (!value) return res.status(403).json({ error: `${nameOfvalue} is not found` })
      try {
        const existvalue = await modelsFunction.getSpecificName({ value })
        if (!!existvalue[0]) return res.status(400).json({ error: `${nameOfvalue} is exist id: ${existvalue[0].id}` })
        const response = await modelsFunction.post({ value })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        return res.status(400).json({ error: error })
      }
    }
  }
}

const routersForOneData = ({ nameOfvalue='', modelsFunction }) => {
  const router = require('express').Router();
  const { getsForOneData, postForOneData } = CRUDMetodForOneData({ nameOfvalue, modelsFunction })

  router.get('/', getsForOneData)
  router.post('/', postForOneData)
  return router 
}

module.exports = { routersForOneData,CRUDMetodForOneData, isString }