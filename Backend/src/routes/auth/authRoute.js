const { login, signup} = require('../../controller/authController');
const express = require('express');

const router = express.Router();

router.post('/signup',signup);

module.exports = router;