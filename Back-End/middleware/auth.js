const jwt = require("jsonwebtoken");
const adminSecretKey = "&6ujyMT$!Y#G9ZM";
const userSecretKey = "4242ujyM7$%^2w!Y6j/p0";

const generateAdminJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, adminSecretKey, { expiresIn: "1h" });
};

const generateUserJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, userSecretKey, { expiresIn: "1h" });
};

const authenticateAdminJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, adminSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateUserJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, userSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateAdminJwt,
  authenticateUserJwt,
  generateAdminJwt,
  generateUserJwt,
};
