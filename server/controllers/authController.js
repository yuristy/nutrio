const User = require("../models/User");
const Role = require("../models/Role");

const messages = require("../messages");
const bcrypt = require("bcrypt");

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) return res.status(400).json(messages.regError);
      const hashedPass = bcrypt.hashSync(password, 5);
      const userRole = Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashedPass,
        roles: [userRole],
      });
      await user.save();
      res.status(200).json(messages.regSuccess);
    } catch (e) {
      res.status(400).json(messages.regError);
    }
  }

  login(req, res) {
    try {
      const { username, password } = req.body;
    } catch (e) {
      res.status(400).json(messages.loginError);
    }
  }
}

module.exports = new authController();
