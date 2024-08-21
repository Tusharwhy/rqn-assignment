const jwt = require("jsonwebtoken");
const MY_SECRET = require("../config");

// Middleware to check if the token is valid and not expired
function VerifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, MY_SECRET);
    req.user = decoded; // Attach decoded payload to req.user for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
}

module.exports = VerifyToken;
