const jwt = require("jsonwebtoken");

exports.generateAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "5h" }
  );

  return token;
};

