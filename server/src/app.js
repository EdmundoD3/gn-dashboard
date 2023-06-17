const express = require('express');
const bodyparser = require('body-parser');

const app = express()


// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//initializate database
const { initializate } = require('./db/database.js');
initializate()

// test
app.get("/api/v1",(req,res)=>{
  res.status(200).json({data:["user","user2"]})
})



// route middlewares
const routes = require('./routes/routes.js');
app.use("/api/v1",routes)



module.exports = app