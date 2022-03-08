const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Load config from .ENV file
dotenv.config({ path: './config/config.env' });

//Connect mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connected to Mongoose'))
  .catch((err) => console.log(err));

const app = express();

//ROUTES
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
