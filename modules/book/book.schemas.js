"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookSchema = exports.CreateCategorySchema = exports.ListCategoriesSchema = exports.CreateAuthorSchema = exports.ListAuthorsSchema = exports.ListBooksSchema = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const authorSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    name: type_provider_typebox_1.Type.String(),
});
const categorySchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    name: type_provider_typebox_1.Type.String(),
});
const bookSchema = type_provider_typebox_1.Type.Object({
    id: type_provider_typebox_1.Type.Integer(),
    title: type_provider_typebox_1.Type.String(),
    authors: type_provider_typebox_1.Type.Array(authorSchema),
    category: categorySchema,
});
exports.ListBooksSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(bookSchema),
    },
};
exports.ListAuthorsSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(authorSchema),
    },
};
exports.CreateAuthorSchema = {
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
    }),
    response: {
        201: authorSchema,
    },
};
exports.ListCategoriesSchema = {
    response: {
        200: type_provider_typebox_1.Type.Array(categorySchema),
    },
};
exports.CreateCategorySchema = {
    body: type_provider_typebox_1.Type.Object({
        name: type_provider_typebox_1.Type.String(),
    }),
    response: {
        201: categorySchema,
    },
};
exports.CreateBookSchema = {
    body: type_provider_typebox_1.Type.Object({
        title: type_provider_typebox_1.Type.String(),
        authorIds: type_provider_typebox_1.Type.Array(type_provider_typebox_1.Type.Integer({ minimum: 1 })),
        categoryId: type_provider_typebox_1.Type.Integer({ minimum: 1 }),
    }),
    response: {
        201: bookSchema,
    },
};
