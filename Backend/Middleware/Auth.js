const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });

    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth;
