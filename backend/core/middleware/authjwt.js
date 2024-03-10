const jwt = require("jsonwebtoken");
const SECRET_KEY = "BACKEND SYSTEM";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader
  if (!token) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    req.user = decoded
    next();
  });
}

module.exports = verifyToken;