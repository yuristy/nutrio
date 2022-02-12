const { validationResult } = require('express-validator');
const messages = require('../messages');

const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

class userController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res
                    .status(400)
                    .json({ message: messages.regError, errors });
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({ ...userData });
        } catch (e) {
            res.status(400).json(messages.regError);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({ ...userData });
        } catch (e) {
            res.status(400).json(messages.loginError);
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json({ token });
        } catch (e) {
            res.status(400).json(messages.logoutError);
        }
    }

    async activate(req, res) {
        try {
            const activationId = req.params.link;
            await userService.activate(activationId);
            res.redirect(process.env.CLIENT_HOST);
        } catch (e) {
            res.status(400).json(messages.logoutError);
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await tokenService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).json({
                ...userData,
            });
        } catch {
            res.status(400).json(messages.refreshError);
        }
    }

    async getUsers(req, res) {
        console.log(req.headers);
        const users = await userService.getUsers();
        res.status(200).json(users);
    }
}

module.exports = new userController();
