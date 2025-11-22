const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
   const authHeader = req.header('Authorization');
   if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Missing Token' });
   }

   const [bearer, token] = authHeader.split(' ');
   if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
         console.error(`Token verification error: ${err}`);
         return res.status(403).json({ message: 'Forbidden Invalid token' });
      }
      
      req.user = decoded;  // store actual decoded token
      next();
   });
};

const authorizeRole = (role) => {
   return (req, res, next) => {
      console.log("USER ROLE FROM TOKEN:", req.user.role);  // <--- ADD THIS
      console.log("ROLE REQUIRED:", role);

      if (req.user.role !== role) {
         return res.status(403).json({ message: 'Access Forbidden: You do not have the correct role' });
      }
      next();
   };
};

module.exports = { authenticateJWT, authorizeRole };
