"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCrewSchema = exports.ListCrewsSchema = exports.crewSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.crewSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    username: type_provider_typebox_1.Type.String(),
    name: type_provider_typebox_1.Type.String(),
    email: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
    phoneNumber: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
});
exports.ListCrewsSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(exports.crewSchema),
    },
};
exports.CreateCrewSchema = {
    body: type_provider_typebox_1.Type.Object({
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String({ format: 'email' })),
        phoneNumber: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()),
    }),
    response: {
        201: exports.crewSchema,
    },
};
