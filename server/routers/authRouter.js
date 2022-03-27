const { Router } = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const { checkIfNumberOnly } = require('../middlewares/middlewares');

const authRouter = new Router();

authRouter.post(
    '/registration',
    [
        check('email', 'Имя не должно быть пустым').notEmpty(),
        check(
            'password',
            'Пароль должен быть больше 4 и меньше 10 символов'
        ).isLength({ min: 4, max: 10 }),
        checkIfNumberOnly,
    ],
    userController.registration
);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/users', userController.getUsers);

module.exports = authRouter;
