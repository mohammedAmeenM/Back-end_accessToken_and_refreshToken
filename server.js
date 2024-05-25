const dotenv = require('dotenv').config()
const app = require('./app');
const connectDB = require('./config/dbConnect');

connectDB() 

app.listen(process.env.PORT,()=>{
    console.log(`Server Running Port NO:${process.env.PORT}`)
})