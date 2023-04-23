"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenHandler = exports.LoginHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    if (username !== env_1.USERNAME_AUTH)
        return reply.badRequest('Invalid credentials.');
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, env_1.PASSWORD_AUTH);
    if (!isPasswordCorrect)
        return reply.badRequest('Invalid credentials.');
    const refreshToken = jsonwebtoken_1.default.sign({}, env_1.REFRESH_TOKEN_SECRET, {
        expiresIn: '3d',
    });
    reply.setCookie('jwt_token', refreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: true,
        secure: true,
        domain: 'kind-pear-hatchling-yoke.cyclic.app',
    });
    const accessToken = jsonwebtoken_1.default.sign({}, env_1.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    return { token: accessToken };
});
exports.LoginHandler = LoginHandler;
const RefreshTokenHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const signedRefreshToken = request.cookies.jwt_token;
    if (!signedRefreshToken)
        return reply.unauthorized('Not authenticated');
    const { value: refreshToken } = reply.unsignCookie(signedRefreshToken);
    if (refreshToken == null)
        return reply.forbidden('Token is invalid');
    const newRefreshToken = jsonwebtoken_1.default.sign({}, env_1.REFRESH_TOKEN_SECRET, {
        expiresIn: '3d',
    });
    reply.setCookie('jwt_token', newRefreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: true,
        secure: true,
        domain: 'kind-pear-hatchling-yoke.cyclic.app',
    });
    const newAccessToken = jsonwebtoken_1.default.sign({}, env_1.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    return { token: newAccessToken };
});
exports.RefreshTokenHandler = RefreshTokenHandler;
