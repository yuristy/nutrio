const jwt = require("jsonwebtoken");
const messages = require("../messages");
const UserModel = require("../models/User");
const TokenModel = require("../models/Token");
const UserDto = require("../dtos/userDto");

class TokenService {
  generateTokens(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
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

  async removeToken(refreshToken) {
    const token = await TokenModel.deleteOne({ refreshToken });
    return token;
  }

  async validateAccessToken(token) {
    try {
      const isTokenValid = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return isTokenValid;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const isTokenValid = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return isTokenValid;
    } catch (e) {
      return null;
    }
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) throw new Error(messages.refreshError);
    const isTokenValid = this.validateRefreshToken(refreshToken);
    const tokenData = await TokenModel.findOne({ refreshToken });
    if (!isTokenValid || !tokenData) throw new Error(messages.refreshError);

    const user = UserModel.findById(tokenData.user);
    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });
    await this.saveRefreshToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new TokenService();
