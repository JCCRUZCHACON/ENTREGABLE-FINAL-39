const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      // console.log(decoded.userLogin)
      req.user = decoded.userLogin;
      next();
    }
  )
}

module.exports = { verifyJWT };