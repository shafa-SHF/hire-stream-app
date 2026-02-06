const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the "Authorization" header
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the same secret key from your controller
    const decoded = jwt.verify(token, 'my_super_secret_key');
    req.user = decoded; // Add user info to the request
    next(); // Move to the next function
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;