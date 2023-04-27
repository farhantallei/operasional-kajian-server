"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemberSchema = exports.ListCrewsSchema = exports.ListMembersSchema = exports.memberSchema = exports.memberRoleSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const roleEnum = [
    type_provider_typebox_1.Type.Literal('operator'),
    type_provider_typebox_1.Type.Literal('editor'),
    type_provider_typebox_1.Type.Literal('teacher'),
];
exports.memberRoleSchema = type_provider_typebox_1.Type.Object({
    memberId: type_provider_typebox_1.Type.Integer(),
    role: type_provider_typebox_1.Type.Union(roleEnum),
});
exports.memberSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    username: type_provider_typebox_1.Type.String(),
    name: type_provider_typebox_1.Type.String(),
    email: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
    phoneNumber: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
    roles: type_provider_typebox_1.Type.Array(exports.memberRoleSchema),
});
exports.ListMembersSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(exports.memberSchema),
    },
};
exports.ListCrewsSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            label: type_provider_typebox_1.Type.String(),
            value: type_provider_typebox_1.Type.Integer(),
        })),
    },
};
exports.CreateMemberSchema = {
    body: type_provider_typebox_1.Type.Object({
        username: type_provider_typebox_1.Type.String({ pattern: '^[a-z][a-z0-9_]+$' }),
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String({ format: 'email' })),
        phoneNumber: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.String()),
        roles: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Union(roleEnum), { uniqueItems: true }),
    }),
    response: {
        201: exports.memberSchema,
    },
};
