require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).send({ message: "User Tidak Memiliki Akses" });

    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!token)
      return res.status(401).send({ message: "User Tidak Memiliki Akses" });

    if (!verified) {
      return res.status(401).send({ message: "Token Tidak Valid" });
    } else if (!verified.id) {
      return res.status(403).json({
        status: res.statusCode,
        message: "Token Tidak Valid",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ status: res.statusCode, message: error.message });
  }
};
