const express =  require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {createAdminAccount} = require('./utils/common');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
//console.log("Mongo URI from env:", process.env.MONGODB_URI);

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('CONNECTED TO MONGODB..!');
    createAdminAccount();
  })
  .catch(error => console.error(`mongoDB connection error: ${error}`));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});