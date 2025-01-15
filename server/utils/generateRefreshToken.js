const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    {
      refreshToken: token,
    }
  );

  return token;
};
