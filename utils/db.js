
const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to mongoDB: ${conn.connection.host}`)
    }catch(error){
        console.log(`failed to connect to database: ${error}`)
    }
}

module.exports = connectDB