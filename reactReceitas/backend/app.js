const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const path = require('path')
require('dotenv').config({ 
  path: path.resolve(__dirname, '.env') 
})

console.log('__dirname:', __dirname)
console.log('Arquivo .env:', __dirname + '/.env')
console.log('MONGODB_URI existe?', !!process.env.MONGODB_URI)
console.log('SECRET existe?', !!process.env.SECRET)

app.use(express.static("public"))

const conm = require("./db/conm.js")
conm()

const routes = require("./routes/router.js")
app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor online")
})

