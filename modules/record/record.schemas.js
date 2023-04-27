"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteRecordActionSchema = exports.CreateRecordSchema = exports.RegisterRecordSchema = exports.ListUpcomingRecordsSchema = exports.ListRecordsSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const book_schemas_1 = require("../book/book.schemas");
const storageDevice_schemas_1 = require("../storageDevice/storageDevice.schemas");
const place_schemas_1 = require("../place/place.schemas");
const member_schemas_1 = require("../member/member.schemas");
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
    type_provider_typebox_1.Type.Literal('operator'),
    type_provider_typebox_1.Type.Literal('editor'),
    type_provider_typebox_1.Type.Literal('admin'),
];
const recordRoleEnum = [
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
    lastPICs: type_provider_typebox_1.Type.Array(member_schemas_1.memberSchema),
    members: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer(),
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        roles: type_provider_typebox_1.Type.Array(member_schemas_1.memberRoleSchema),
        email: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        phoneNumber: type_provider_typebox_1.Type.Union([type_provider_typebox_1.Type.Null(), type_provider_typebox_1.Type.String()]),
        recordRole: type_provider_typebox_1.Type.Union(recordRoleEnum),
        salaryStatus: type_provider_typebox_1.Type.Union(salaryStatusEnum),
    })),
    book: book_schemas_1.bookSchema,
    place: place_schemas_1.placeSchema,
    startedOn: type_provider_typebox_1.Type.String(),
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
    members: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
        id: type_provider_typebox_1.Type.Integer(),
        username: type_provider_typebox_1.Type.String(),
        name: type_provider_typebox_1.Type.String(),
        roles: type_provider_typebox_1.Type.Array(member_schemas_1.memberRoleSchema),
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
        sequence: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        bookId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        placeId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
        startedOn: type_provider_typebox_1.Type.String({ format: 'date-time' }),
        crewIds: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Integer({ minimum: 1 }), {
            uniqueItems: true,
            minItems: 2,
            maxItems: 2,
        }),
        substituteIds: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Integer({ minimum: 1 }), {
            uniqueItems: true,
            minItems: 2,
            maxItems: 2,
        }),
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
        members: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Object({
            id: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
            recordRole: type_provider_typebox_1.Type.Union(recordRoleEnum),
        })),
        bookId: type_provider_typebox_1.Type.Integer(),
        placeId: type_provider_typebox_1.Type.Integer(),
        startedOn: type_provider_typebox_1.Type.String({ format: 'date-time' }),
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
        PICIds: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        locationId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: { 200: recordSchema },
};
