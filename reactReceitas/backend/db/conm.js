const mongoose = require("mongoose")
require("dotenv").config()
const MONGODB_URI  = process.env.MONGODB_URI 

async function main() {
    try{
        mongoose.set("strictQuery", true)

        await mongoose.connect(`${MONGODB_URI }`)
        console.log("Conectado ao banco")
    } catch(error) {
        console.log(error)
    }
}

module.exports = main