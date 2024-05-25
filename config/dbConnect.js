const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Db is connected')
    } catch (error) { 
        console.log(error,'error connecting')
    }
}
module.exports = connectDB;