const express = require('express');
const dotenv = require('dotenv');

//Load config from .ENV file
dotenv.config({ path: './config/config.env' });

const app = express();

//ROUTES
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
