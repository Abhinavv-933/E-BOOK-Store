const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
   const auth = req.header('Authorization');
}