"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = exports.addPlugins = void 0;
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const fastify_1 = __importDefault(require("fastify"));
const env_1 = require("./env");
const routes_1 = require("./routes");
const app = (0, fastify_1.default)().withTypeProvider();
function addPlugins() {
    app.register(cookie_1.default, { secret: env_1.COOKIE_SECRET });
    app.register(jwt_1.default, { secret: env_1.JWT_SECRET, sign: { expiresIn: '3d' } });
    app.register(sensible_1.default);
}
exports.addPlugins = addPlugins;
function addRoutes() {
    app.register(routes_1.routes, { prefix: 'api' });
}
exports.addRoutes = addRoutes;
exports.default = app;
