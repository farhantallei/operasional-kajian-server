"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteRecordActionSchema = exports.CreateRecordSchema = exports.RegisterRecordSchema = exports.ListUpcomingRecordsSchema = exports.ListRecordsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const book_schemas_1 = require("../book/book.schemas");
const storageDevice_schemas_1 = require("../storageDevice/storageDevice.schemas");
const place_schemas_1 = require("../place/place.schemas");
const crew_schemas_1 = require("../crew/crew.schemas");
const actionEnum = [
    type_provider_typebox_1.Type.Literal('record'),
    type_provider_typebox_1.Type.Literal('move'),
    type_provider_typebox_1.Type.Literal('edit'),
    type_provider_typebox_1.Type.Literal('submit'),
];
const statusEnum = [
    type_provider_typebox_1.Type.Literal('raw'),
    type_provider_typebox_1.Type.Literal('final'),
    type_provider_typebox_1.Type.Literal('lost'),
    type_provider_typebox_1.Type.Literal('corrupt'),
];
const roleEnum = [
    type_provider_typebox_1.Type.Literal('recording'),
    type_provider_typebox_1.Type.Literal('streaming'),
    type_provider_typebox_1.Type.Literal('editing'),
];
const salaryStatusEnum = [type_provider_typebox_1.Type.Literal('paid'), type_provider_typebox_1.Type.Literal('unpaid')];
const recordSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    title: type_provider_typebox_1.Type.String(),
    sequence: type_provider_typebox_1.Type.Integer(),
    lastAction: type_provider_typebox_1.Type.Union(actionEnum),
    location: storageDevice_schemas_1.storageDeviceSchema,
    status: type_provider_typebox_1.Type.Union(statusEnum),
    lastPIC: type_provider_typebox_1.Type.Union([crew_schemas_1.crewSchema, type_provider_typebox_1.Type.Null()]),
    crews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer(),
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        phoneNumber: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        role: type_provider_typebox_1.Type.Union(roleEnum),
        salaryStatus: type_provider_typebox_1.Type.Union(salaryStatusEnum),
    })),
    book: book_schemas_1.bookSchema,
    place: place_schemas_1.placeSchema,
    recordedAt: type_provider_typebox_1.Type.String(),
    updatedAt: type_provider_typebox_1.Type.String(),
});
const upcomingRecordSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    title: type_provider_typebox_1.Type.String(),
    sequence: type_provider_typebox_1.Type.Integer(),
    book: book_schemas_1.bookSchema,
    place: place_schemas_1.placeSchema,
    startedOn: type_provider_typebox_1.Type.String(),
    crews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer(),
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        email: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        phoneNumber: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        substitute: type_provider_typebox_1.Type.Boolean(),
    })),
});
exports.ListRecordsSchema = {
    response: { 200: type_provider_typebox_1.Type.Array(recordSchema) },
};
exports.ListUpcomingRecordsSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(upcomingRecordSchema),
    },
};
exports.RegisterRecordSchema = {
    body: type_provider_typebox_1.Type.Object({
        title: type_provider_typebox_1.Type.String(),
        sequence: type_provider_typebox_1.Type.Integer(),
        bookId: type_provider_typebox_1.Type.Integer(),
        placeId: type_provider_typebox_1.Type.Integer(),
        startedOn: type_provider_typebox_1.Type.String({ format: 'date-time' }),
        crews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            substitute: type_provider_typebox_1.Type.Boolean(),
        })),
    }),
    response: {
        201: upcomingRecordSchema,
    },
};
exports.CreateRecordSchema = {
    body: type_provider_typebox_1.Type.Object({
        title: type_provider_typebox_1.Type.String(),
        sequence: type_provider_typebox_1.Type.Integer(),
        locationId: type_provider_typebox_1.Type.Integer(),
        status: type_provider_typebox_1.Type.Union(statusEnum),
        crews: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            role: type_provider_typebox_1.Type.Union(roleEnum),
        })),
        bookId: type_provider_typebox_1.Type.Integer(),
        placeId: type_provider_typebox_1.Type.Integer(),
        recordedAt: type_provider_typebox_1.Type.String({ format: 'date-time' }),
    }),
    params: type_provider_typebox_1.Type.Object({
        upcomingRecordId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: { 201: recordSchema },
};
exports.ExecuteRecordActionSchema = {
    body: type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        action: type_provider_typebox_1.Type.Union(actionEnum),
        status: type_provider_typebox_1.Type.Union(statusEnum),
        PICId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        locationId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: { 200: recordSchema },
};
