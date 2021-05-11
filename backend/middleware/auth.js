const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "UNAUTHENTICATED" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    let user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(401).send({ message: "UNAUTHENTICATED" });
    next();
  } catch (ex) {
    res.header(400).send({ message: "UNAUTHENTICATED" });
  }
}

module.exports = auth;
