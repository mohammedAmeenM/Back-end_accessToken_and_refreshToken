const jwt = require("jsonwebtoken");
const UserToken = require("../models/userTokenSchema");

const generateTokens = async (user) => {
  console.log(user._id);
  try {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "14m",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "30d" }
    );

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) {
      await UserToken.findOneAndDelete({ userId: user._id });
    }

    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return { accessToken, refreshToken };
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = generateTokens;
