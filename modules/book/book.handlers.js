"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookHandler = exports.CreateCategoryHandler = exports.ListCategoriesHandler = exports.CreateAuthorHandler = exports.ListAuthorsHandler = exports.ListBooksHandler = void 0;
const book_services_1 = require("./book.services");
const ListBooksHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, book_services_1.listBooks)(reply);
        return books.map((_a) => {
            var { authors } = _a, book = __rest(_a, ["authors"]);
            return (Object.assign(Object.assign({}, book), { authors: authors.map(({ author }) => author) }));
        });
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.ListBooksHandler = ListBooksHandler;
const ListAuthorsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield (0, book_services_1.listAuthors)(reply);
        return authors;
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.ListAuthorsHandler = ListAuthorsHandler;
const CreateAuthorHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = request.body;
    try {
        const isAuthorExist = yield (0, book_services_1.checkAuthor)(reply, name);
        if (isAuthorExist)
            return reply.badRequest('Author is already exist.');
        const author = yield (0, book_services_1.createAuthor)(reply, { name });
        return reply.code(201).send(author);
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.CreateAuthorHandler = CreateAuthorHandler;
const ListCategoriesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, book_services_1.listCategories)(reply);
        return categories;
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.ListCategoriesHandler = ListCategoriesHandler;
const CreateCategoryHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = request.body;
    try {
        const isCategoryExist = yield (0, book_services_1.checkCategory)(reply, name);
        if (isCategoryExist)
            return reply.badRequest('Category is already exist.');
        const category = yield (0, book_services_1.createCategory)(reply, { name });
        return reply.code(201).send(category);
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.CreateCategoryHandler = CreateCategoryHandler;
const CreateBookHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authorIds, categoryId } = request.body;
    try {
        const book = yield (0, book_services_1.createBook)(reply, { title, authorIds, categoryId });
        const authors = yield (0, book_services_1.listAuthorsByBookId)(reply, book.id);
        return reply.code(201).send({
            id: book.id,
            title: book.title,
            authors: authors.map(({ author }) => (Object.assign({}, author))),
            category: {
                id: book.categoryId,
                name: book.category.name,
            },
        });
    }
    catch (error) {
        return reply.internalServerError(typeof error === 'string' ? error : 'Internal Server Error');
    }
});
exports.CreateBookHandler = CreateBookHandler;
