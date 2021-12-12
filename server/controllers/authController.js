const User = require("../models/User");
const Role = require("../models/Role");

const messages = require("../messages");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { getJwtToken } = require("../utils");

const secret = process.env.SECRET || "";

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: messages.regError, errors });
      }
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
}

module.exports = new authController();
