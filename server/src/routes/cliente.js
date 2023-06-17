const router = require('express').Router();
const Cliente = require('../models/Cliente')
const isNumber= (num) => typeof(num) === 'number'
const isString= (str) => typeof(str) === 'string'

router.get('/id', async (req, res) => {
  const {limit=10,offset=0} = req.body

  if (!limit&&!offset) return res.status(403).json({error: 'limit or offset not found'})
  if (!isNumber(limit)||!isNumber(offset)) return res.status(403).json({error: 'limit or offset is not a number'})
  try {
    const response = await Cliente.get({limit,offset})
    return res.status(200).json({
      error:null,
      data:response})
  } catch (error) {
    return res.status(400).json({error:error})
  }
})
// router.delete('/:id', async (req, res) => {
//   const id = req.params.id;
router.get('/name', async (req, res) => {
  const {name=''} = req.query
  if (!name) return res.status(403).json({error: 'name not found'})
  if (!isString(name)) return res.status(403).json({error: 'name is not string'})
  try {
    const response = await Cliente.getByName({name:name})
    return res.status(200).json({
      error:null,
      data:response})
  } catch (error) {
    return res.status(400).json({error:error})
  }
})
router.get('/data', async (req, res) => {
  const { name='', lastName='', phone='' } = req.query
  if (!isString(name)&&!isString(lastName)) return res.status(403).json({error: 'name or lastname is not string'})
  try {
    const response = await Cliente.getPersonalDates({ name, lastName, phone })
    return res.status(200).json({
      error:null,
      data:response})
  } catch (error) {
    console.log(error)
    return res.status(400).json({error:error})
  }
})

router.post('/', async (req, res) => {
  const { name, lastName='', email='', phone='', date='', comments='', cobradorId='', statusId, mongodbId='', vendedoraId } = req.body
  if (!name&&!statusId&&!vendedoraId) return res.status(403).json({error: 'ingrese un Cliente'})
  try {
    const response = await Cliente.post({ name, lastName, email, phone, date, comments, cobradorId, statusId, mongodbId, vendedoraId })
    console.log(response)
    return res.status(200).json({
      error:null,
      data:response})
  } catch (error) {
    return res.status(400).json({error:error})
  }
})

module.exports = router;