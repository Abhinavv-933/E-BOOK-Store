const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
 
const createUser = async(userData) => {
  try {
    const email = userData.email;
    const password = userData.password;
    const firstName = userData.firstName;
    const lastName = userData.lastName;

    const existingUser = await User.findOne({email: email});
     if(existingUser){
      throw new Error('User already exist !');
     }
     const hashedPassword = await bcrypt.hash(password,10);
     const newUser = new User({
      email: email,
      firstName:firstName,
      lastName:lastName,
      role: userData.role || 'CUSTOMER',
      password:hashedPassword
     });
     await newUser.save();
     return newUser;

  } catch (error) {
     console.log(`Error creating user account: ${error}`); 
  }
};

const loginUser = async(userData) => {
  try {
    const email = userData.email;
    const password = userData.password;

    const existingUser = await User.findOne({email: email});
     if(!existingUser){
      throw new Error('User does not exist !');
     }
     const isPasswordValid = await bcrypt.compare(password,existingUser.password);
     if(! isPasswordValid){
      throw new Error('Invalid password');
     }
     const token = jwt.sign({id:existingUser._id,role: existingUser.role},
      process.env.JWT_SECRET,
      { expiresIn: '1d'}
     )
     return {
      token,
      role: existingUser.role,
    };

  } catch (error) {
      console.error(`Error logging in user: ${error.message}`);
    throw error;
  }
};

module.exports = {createUser, loginUser};