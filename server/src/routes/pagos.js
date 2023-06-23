const router = require('express').Router();
const Pagos = require('../models/Pagos');

const { checkType } = require("./modules")
const { isInteger } = checkType

const { count, getPages } = require('../sql/modules/pagination')({ model: Pagos });

router.get('/', getPages)

router.get('/count', count)

router.get('/recibo', async (req, res) => {
  const { noRecibo = '', limit = 10, offset = 0 } = req.query
  if (!isInteger(limit) && !isInteger(offset)) return res.status(403).json({ error: 'recibo is not found' })
  if (!noRecibo) return res.status(403).json({ error: 'recibo is not found' })
  try {
    const response = await Pagos.getByNoRecibo({ noRecibo, limit, offset })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { cuentaId, pago, date, noRecibo } = req.body
  if (!cuentaId && !pago && !date && !noRecibo) return res.status(403).json({ error: 'ingrese un Cliente' })
  try {
    const response = await Pagos.post({ cuentaId, pago, date, noRecibo })
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})
router.put('/', async (req, res) => {
  const { id, cuentaId, pago, date, noRecibo } = req.body
  if (!id && !isInteger(id)) return res.status(403).json({ error: 'enter a valid id' })
  if (!cuentaId && !pago && !date && !noRecibo) return res.status(403).json({
    error: 'enter a valid cuentaId, pago, date or noRecibo'
  })
  try {
    const response = await Pagos.put({ id, cuentaId, pago, date, noRecibo })
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
  if (!id && !isInteger(id)) return res.status(403).json({ error: 'id not found or not valid' })
  try {
    const response = await Pagos.deleteById({id})
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

module.exports = router;
