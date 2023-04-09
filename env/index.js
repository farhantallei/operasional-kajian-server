"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.COOKIE_SECRET = exports.PORT = exports.DOMAIN = exports.CLIENT_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CLIENT_URL = process.env.CLIENT_URL;
exports.DOMAIN = process.env.DOMAIN;
exports.PORT = process.env.PORT;
exports.COOKIE_SECRET = process.env.COOKIE_SECRET;
exports.JWT_SECRET = process.env.JWT_SECRET;
