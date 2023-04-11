"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceSchema = exports.ListPlacesSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const placeSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    name: type_provider_typebox_1.Type.String(),
    address: type_provider_typebox_1.Type.String(),
    latitude: type_provider_typebox_1.Type.Number(),
    longitude: type_provider_typebox_1.Type.Number(),
});
exports.ListPlacesSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(placeSchema),
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
        201: placeSchema,
    },
};
