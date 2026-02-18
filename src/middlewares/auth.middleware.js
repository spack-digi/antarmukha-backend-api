const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req?.cookies?.accessToken;
    console.log("token", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id);

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (error) {
    next(error);
  }
};

// Verify Token for role based
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.body.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "email", "role"],
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
