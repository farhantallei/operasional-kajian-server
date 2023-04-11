"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenSchema = exports.LoginSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.LoginSchema = {
    body: type_provider_typebox_1.Type.Object({
        username: type_provider_typebox_1.Type.String(),
        password: type_provider_typebox_1.Type.String(),
    }),
    response: {
        200: type_provider_typebox_1.Type.Object({
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
exports.RefreshTokenSchema = {
    response: {
        200: type_provider_typebox_1.Type.Object({
            token: type_provider_typebox_1.Type.String(),
        }),
    },
};
