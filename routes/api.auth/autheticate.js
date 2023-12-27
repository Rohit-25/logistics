const jwt = require('jsonwebtoken');

// Middleware to verify JWT and check user's role
const authenticateAndAuthorize = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      const userId = decoded.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: true }, // Fetch user roles
      });

      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      const userRoles = user.roles.map((role) => role.name); // Extract user's role names

      // Check if the user has the required role
      if (!userRoles.includes(requiredRole)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      // User authenticated and has the required role, store user ID in request for further use
      req.userId = userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
  };
};
