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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookHandler = exports.CreateCategoryHandler = exports.ListCategoriesHandler = exports.CreateAuthorHandler = exports.ListAuthorsHandler = exports.ListBooksHandler = void 0;
const book_services_1 = require("./book.services");
const ListBooksHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, book_services_1.listBooks)(reply);
});
exports.ListBooksHandler = ListBooksHandler;
const ListAuthorsHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const authors = yield (0, book_services_1.listAuthors)(reply);
    return authors;
});
exports.ListAuthorsHandler = ListAuthorsHandler;
const CreateAuthorHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = request.body;
    const isAuthorExist = yield (0, book_services_1.checkAuthor)(reply, name);
    if (isAuthorExist)
        return reply.badRequest('Author is already exist.');
    const author = yield (0, book_services_1.createAuthor)(reply, { name });
    return reply.code(201).send(author);
});
exports.CreateAuthorHandler = CreateAuthorHandler;
const ListCategoriesHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, book_services_1.listCategories)(reply);
    return categories;
});
exports.ListCategoriesHandler = ListCategoriesHandler;
const CreateCategoryHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = request.body;
    const isCategoryExist = yield (0, book_services_1.checkCategory)(reply, name);
    if (isCategoryExist)
        return reply.badRequest('Category is already exist.');
    const category = yield (0, book_services_1.createCategory)(reply, { name });
    return reply.code(201).send(category);
});
exports.CreateCategoryHandler = CreateCategoryHandler;
const CreateBookHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authorIds, categoryIds } = request.body;
    const book = yield (0, book_services_1.createBook)(reply, { title, authorIds, categoryIds });
    const authors = yield (0, book_services_1.listAuthorsByBookId)(reply, book.id);
    const categories = yield (0, book_services_1.listCategoriesByBookId)(reply, book.id);
    return reply.code(201).send(Object.assign(Object.assign({}, book), { authors: authors.map(({ author }) => (Object.assign({}, author))), categories: categories.map(({ category }) => (Object.assign({}, category))) }));
});
exports.CreateBookHandler = CreateBookHandler;
