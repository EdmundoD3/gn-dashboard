const router = require('express').Router();
const Pagos = require('../models/Pagos');

const { count, getPages } = require('../sql/modules/pagination')({ model: Pagos });

router.get('/', getPages)

router.get('/count', count)

router.get('/recibo', async (req, res) => {
  const { recibo = '', limit = 10, offset = 0 } = req.query
  try {
    const response = await Pagos.getByNoRecibo({ noRecibo: recibo, limit, offset })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { clienteId, street, noAddress, betweenstreet } = req.body
  if (!clienteId && !street && !noAddress && !betweenstreet) return res.status(403).json({ error: 'ingrese un Cliente' })
  try {
    const response = await Addres.post({ clienteId, street, noAddress, betweenstreet })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.put('/', async (req, res) => {
  const { id, street = '', noAddress = '', betweenstreet = '', referencia = '', observation = '', stateId = 0, coloniaId = 0, cityId = 0 } = req.body
  if (!id) return res.status(403).json({ error: 'ingrese un Cliente' })
  try {
    const response = await Addres.put({ id, street, noAddress, betweenstreet, referencia, observation, stateId, coloniaId, cityId })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.delete('/', async (req, res) => {
  const { id } = req.body
  if (!id) return res.status(403).json({ error: 'id not found' })
  try {
    const response = await Addres.deleteById({ id })
    console.log(response)
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

module.exports = router;
