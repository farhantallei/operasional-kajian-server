"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceSchema = exports.ListPlacesSchema = exports.placeSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
exports.placeSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    name: type_provider_typebox_1.Type.String(),
    address: type_provider_typebox_1.Type.String(),
    latitude: type_provider_typebox_1.Type.Number(),
    longitude: type_provider_typebox_1.Type.Number(),
});
exports.ListPlacesSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            label: type_provider_typebox_1.Type.String(),
            value: type_provider_typebox_1.Type.Integer(),
        })),
    },
};
exports.CreatePlaceSchema = {
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
        address: type_provider_typebox_1.Type.String(),
        latitude: type_provider_typebox_1.Type.Number(),
        longitude: type_provider_typebox_1.Type.Number(),
    }),
    response: {
        201: exports.placeSchema,
    },
};
