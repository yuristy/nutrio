const jwt = require("jsonwebtoken");
const TokenModel = require("../models/Token");

class TokenService {
  generateTockens(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accesToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
