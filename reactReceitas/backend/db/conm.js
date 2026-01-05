const mongoose = require("mongoose")
require("dotenv").config()
const DB_CONECTION = process.env.DB_CONECTION

async function main() {
    try{
        mongoose.set("strictQuery", true)

        await mongoose.connect(`${DB_CONECTION}`)
        console.log("Conectado ao banco")
    } catch(error) {
        console.log(error)
    }
}

module.exports = main