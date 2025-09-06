const bcrypt = require('bcryptjs');
const user = require('../models/user');
require('dotenv').config();
 
const createAdminAccount = async() => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const firstName = process.env.ADMIN_FIRSTNAME;
    const lastName = process.env.ADMIN_LASTNAME;

    const existingAdmin = await user.findOne({email: email});
     if(existingAdmin){
      console.log('Admin Account already exist !');
      return;
     }
     const hashedPassword = await bcrypt.hash(password,10);
     const admin = new user({
      email: email,
      firstName:firstName,
      lastName:lastName,
      role:'ADMIN',
      password:hashedPassword
     });
     await admin.save();
     console.log('Admin account created successfully!');

  } catch (error) {
     console.log(`error creating admin account: ${error}`); 
  }
};

module.exports = {createAdminAccount};