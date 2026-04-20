const { signin, signup } = require('../../controller/authController');
const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Auth route hit:', req.method, req.path);
  next();
});

router.post('/signup', signup);
router.post('/login', signin);

module.exports = router;