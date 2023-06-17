const router = require('express').Router();
const Nota = require('../models/Nota')

router.post('/', async (req, res) => {
  const { cliente, addres, cuenta, compra } = req.body
  if (!cliente||!addres||!cuenta||!compra) return res.status(403).json({ error: 'missing data' })
  try {
    const response = await Nota.post({cliente,addres,cuenta,compra})
    return res.status(200).json({
      error: null,
      data: response
    })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

module.exports = router;