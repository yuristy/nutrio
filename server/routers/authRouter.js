const { Router } = require("express");
const userController = require("../controllers/userController");
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
  userController.registration
);
authRouter.post("/login", userController.login);
authRouter.post("/logout", userController.logout);
authRouter.get("/activate:link");
authRouter.get("/refresh");

module.exports = authRouter;
