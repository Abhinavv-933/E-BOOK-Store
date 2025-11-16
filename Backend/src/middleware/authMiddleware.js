const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
   const authHeader = req.header('Authorization');
   if(!authheader){
      return res.status(401).json({message: 'Unauthorized: Missing Token'});
   }

   const [bearer, token] =authHeader.split(' ');
   if(bearer !== "Bearer" || !token){
      return res.status(401).json({message: 'Unauthorized: Invalid token format'});
   }

   jwt.verify(token, process.env.JWT_SECRET , (user,err) => {
      if(err){
         console.error(`Token verification error : ${err}`);
         return res.status(403).json({message: 'Forbidden Invalid token'});
      };
      req.user = user;
      next();
   })
};

const authorizeRole = (role) => {
   return (req, res, next) => {
      if(req.user.role !== role){
          return res.status(403).json({message: 'Access Forbidden: You do not have the correct role'});
      }
      next();
   }
};

module.exports =  {authenticateJWT,authorizeRole};