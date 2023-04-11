"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.COOKIE_SECRET = exports.PORT = exports.PASSWORD_AUTH = exports.USERNAME_AUTH = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.USERNAME_AUTH = process.env.USERNAME_AUTH;
exports.PASSWORD_AUTH = process.env.PASSWORD_AUTH;
exports.PORT = process.env.PORT;
exports.COOKIE_SECRET = process.env.COOKIE_SECRET;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
