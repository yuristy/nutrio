const UserModel = require("../models/User");
const RoleModel = require("../models/Role");
const UserDto = require("../dtos/userDto");

const EmailService = require("./emailService");
const TokenService = require("./tokenService");

const bcrypt = require("bcrypt");
const uuid = require("uuid");

const messages = require("../messages");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) throw new Error(messages.regError);
    const hashedPass = bcrypt.hashSync(password, 3);
    const activationLink = uuid.v4();
    const userRole = RoleModel.findOne({ value: "USER" });
    const user = await UserModel.create({
      email,
      password: hashedPass,
      activationLink,
      roles: [userRole],
    });
    await EmailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTockens({ ...userDto });
    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
