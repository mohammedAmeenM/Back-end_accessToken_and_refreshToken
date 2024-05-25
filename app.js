const express = require('express');
const app = express();
const morgan = require('morgan');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRouter');

app.use(morgan('dev'));
app.use(express.json())
app.use('/api/users',authRouter);
app.use('/api/users',userRouter);

module.exports = app;

