const UserModel = require('../models/User');
const RoleModel = require('../models/Role');
const UserDto = require('../dtos/userDto');

const emailService = require('./emailService');
const tokenService = require('./tokenService');

const bcrypt = require('bcrypt');
const uuid = require('uuid');

const messages = require('../messages');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) throw new Error(messages.regError);
        const hashedPass = await bcrypt.hashSync(password, 3);
        const activationId = uuid.v4();
        const userRole = await RoleModel.findOne({ value: 'USER' });
        const user = await UserModel.create({
            email,
            password: hashedPass,
            activationId,
            roles: [userRole.value],
        });
        await emailService.sendActivationMail(
            email,
            `${process.env.API_HOST}/auth/activate/${activationId}`
        );
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async activate(activationId) {
        const user = await UserModel.findOne({ activationId });
        if (!user) throw new Error(messages.regError); //TODO сделать сообщения об ошибке
        user.isActivated = true;
        await user.save();
        return user.isActivated;
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error(messages.regError); //TODO сделать сообщения об ошибке
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) throw new Error(messages.regError);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getUsers() {
        const users = await UserModel.findOne();
        return users;
    }
}

module.exports = new UserService();
