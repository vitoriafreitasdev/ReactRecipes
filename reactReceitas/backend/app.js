const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())


require('dotenv').config({ path: __dirname + '/.env' })

app.use(express.static("public"))

const conm = require("./db/conm.js")
conm()

const routes = require("./routes/router.js")
app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor online")
})