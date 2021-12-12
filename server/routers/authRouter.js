const { Router } = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const { checkIfNumberOnly } = require("../middlewares/middlewares");

const authRouter = new Router();

authRouter.post(
  "/registration",
  [
    check("username", "Имя не должно быть пустым").notEmpty(),
    check(
      "password",
      "Пароль доложен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
    checkIfNumberOnly,
  ],
  authController.registration
);
authRouter.post("/login", authController.login);

module.exports = authRouter;
