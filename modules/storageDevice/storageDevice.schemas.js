"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStorageDeviceSchema = exports.ListStorageDevicesSchema = exports.CreateDeviceSchema = exports.ListDevicesSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const deviceSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    type: type_provider_typebox_1.Type.String(),
});
const storageDeviceSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    brand: type_provider_typebox_1.Type.String(),
    device: deviceSchema,
    storage: type_provider_typebox_1.Type.Integer(),
    owner: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer(),
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
    }),
});
exports.ListDevicesSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(deviceSchema),
    },
};
exports.CreateDeviceSchema = {
    body: type_provider_typebox_1.Type.Object({
        type: type_provider_typebox_1.Type.String(),
    }),
    response: {
        201: deviceSchema,
    },
};
exports.ListStorageDevicesSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(storageDeviceSchema),
    },
};
exports.CreateStorageDeviceSchema = {
    body: type_provider_typebox_1.Type.Object({
        brand: type_provider_typebox_1.Type.String(),
        deviceId: type_provider_typebox_1.Type.Integer(),
        storage: type_provider_typebox_1.Type.Integer(),
        ownerId: type_provider_typebox_1.Type.Integer(),
    }),
    response: {
        201: storageDeviceSchema,
    },
};
