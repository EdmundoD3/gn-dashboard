const router = require("express").Router();

const addres = require("./addres.js");
const city = require("./city.js");
const cliente = require("./cliente.js")
const cobrador = require("./cobrador.js");
const colonia = require("./colonia.js")
const compra = require("./compra.js");
const nota = require("./nota.js");
const pagos = require("./pagos.js")
const state = require("./state.js")
const status = require("./status.js");
const vendedora = require("./vendedora.js")

// route middlewares
router.use("/addres", addres);
router.use("/city", city);
router.use("/client", cliente);
router.use("/cobrador", cobrador);
router.use("/colonia", colonia);
router.use("/compra", compra);
router.use("/nota", nota);
router.use("/pagos", pagos)
router.use("/state", state)
router.use("/status", status);
router.use("/vendedora", vendedora)


module.exports = router;
