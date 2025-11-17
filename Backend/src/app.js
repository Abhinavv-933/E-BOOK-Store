const express =  require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const {createAdminAccount} = require('./utils/common');
const authRoute = require('./routes/auth/authRoute');
const adminBookRoute = require('./routes/admin/bookRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
//console.log("Mongo URI from env:", process.env.MONGODB_URI);
const corsorigin = process.env.CORS_ORIGIN;

const corsOption = {
   origin : corsorigin,
   optionSuccessStatus:200
};

app.use(cors(corsOption));

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('CONNECTED TO MONGODB..!');
    createAdminAccount();
  })
  .catch(error => console.error(`mongoDB connection error: ${error}`));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

app.use('/api/auth', authRoute); 

//admin Routes
app.use('/api/admin/book',adminBookRoute);