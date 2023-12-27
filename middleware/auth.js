const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware to verify JWT and check user's role
function authenticateAndAuthorize(requiredRole){
  return async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'secret-key');
      const userId = decoded.userId;
       
      const user = await prisma.users.findUnique({
        where: { id: userId },
        include : { Role : true}, // Fetch user roles
      });
      console.log(111,userId,user)
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      const userRoles = user.Role.map((role) => role.name); // Extract user's role names

      // Check if the user has the required role
      if (!userRoles.includes(requiredRole)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // User authenticated and has the required role, store user ID in request for further use
      req.userId = userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' ,
    details : error.message});
    }
  };
};
module.exports = authenticateAndAuthorize;