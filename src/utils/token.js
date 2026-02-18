const { v4: uuidv4 } = require("uuid");
const { Tokens } = require("../models");
const jwt = require("jsonwebtoken");
const { where, json } = require("sequelize");

exports.createRefreshToken = async (user, type) => {
  let token = uuidv4();

  let expiryDate = Date.now() + 1000 * 60 * 60 * 24 * 100;

  let refreshToken = await Tokens.create({
    token: token,
    expire: expiryDate,
    userId: user.id,
  });

  return refreshToken;
};

exports.refreshTokenHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        success: false,
        message: "Token is required",
      });
    }

    const refToken = await Tokens.findOne({
      where: { token: refreshToken },
    });

    if (!refToken) {
      return res.status(404).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (refToken.expire < Date.now()) {
      await refToken.destroy();
      return res.status(404).json({
        success: false,
        message: "Refresh token has expired",
      });
    }

    const accessToken = await jwt.sign(
      { id: refToken.userId },
      process.env.JWT_SECRET,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expire: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
