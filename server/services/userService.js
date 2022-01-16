const UserModel = require("../models/User");
const RoleModel = require("../models/Role");
const UserDto = require("../dtos/userDto");

const emailService = require("./emailService");
const tokenService = require("./tokenService");

const bcrypt = require("bcrypt");
const uuid = require("uuid");

const messages = require("../messages");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) throw new Error(messages.regError);
    const hashedPass = await bcrypt.hashSync(password, 3);
    const activationId = uuid.v4();
    const userRole = await RoleModel.findOne({ value: "USER" });
    const user = await UserModel.create({
      email,
      password: hashedPass,
      activationId,
      roles: [userRole],
    });
    await emailService.sendActivationMail(email, activationId);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  // async login() {
  //   const { username, password } = req.body;
  //   const user = await User.findOne({ username });
  //   if (!user) return res.status(400).json(messages.loginError);
  //   const isPassCorrect = bcrypt.compareSync(password, user.password);
  //   if (!isPassCorrect)
  //     return res.status(400).json({ message: messages.loginError });
  //   const token = getJwtToken(jwt, secret, user._id, user.roles);
  // }

  // async getUsers() {
  //   const users = await UserModel.find();
  //   return users;
  // }
}

module.exports = new UserService();
