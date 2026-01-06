
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const path = require('path')
require('dotenv').config({ 
  path: path.resolve(__dirname, '.env') 
})

app.use('/images', express.static(path.join(__dirname, '../public/images')))

const conm = require("./db/conm.js")
conm()

const routes = require("./routes/router.js")
app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor online")
})

