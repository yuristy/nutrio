const { validationResult } = require("express-validator");
const messages = require("../messages");

const userService = require("../services/userService");

class userController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: messages.regError, errors });

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res
        .status(200)
        .json({ mesages: messages.regSuccess, ...userData });
    } catch (e) {
      res.status(400).json(messages.regError);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json(messages.loginError);
      const isPassCorrect = bcrypt.compareSync(password, user.password);
      if (!isPassCorrect)
        return res.status(400).json({ message: messages.loginError });
      const token = getJwtToken(jwt, secret, user._id, user.roles);
      res.status(200).json({ message: messages.loginSuccess });
    } catch (e) {
      res.status(400).json(messages.loginError);
    }
  }

  async logout(req, res) {
    try {
      res.status(200).json({ messages: messages.logoutSuccess });
    } catch (e) {
      res.status(400).json(messages.logoutError);
    }
  }
}

module.exports = new userController();
