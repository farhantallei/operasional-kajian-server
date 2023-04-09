"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBooksSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.ListBooksSchema = {
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: typebox_1.Type.Integer(),
            title: typebox_1.Type.String(),
            authors: typebox_1.Type.Array(typebox_1.Type.Object({
                id: typebox_1.Type.Integer(),
                name: typebox_1.Type.String(),
            })),
            category: typebox_1.Type.Object({
                id: typebox_1.Type.Integer(),
                name: typebox_1.Type.String(),
            }),
        })),
    },
};
