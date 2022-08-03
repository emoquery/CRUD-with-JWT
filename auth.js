const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["x-token"];

  if (!token) {
    return res.status(403).send("you need token to authorize");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
  } catch (error) {
    console.log("invalid token");
  }
  return next();
};

module.exports = verifyToken;
