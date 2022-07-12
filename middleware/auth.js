const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ success: false, message: "Access token not found" });
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_CERT_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
const verifyTokenAndAuthor = (req, res, next) => {
  verifyAuth(req, res, () => {
    if (req.userId === req.params.id || req.userId.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: "You are not alowed to do that!" });
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
module.exports = { verifyAuth, verifyTokenAndAuthor, verifyTokenAndAdmin };
