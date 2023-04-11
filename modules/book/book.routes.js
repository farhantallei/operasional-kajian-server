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
exports.bookRoutes = void 0;
const book_schemas_1 = require("./book.schemas");
const book_handlers_1 = require("./book.handlers");
const bookRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: book_schemas_1.ListBooksSchema,
        handler: book_handlers_1.ListBooksHandler,
    });
    route.post('/', {
        schema: book_schemas_1.CreateBookSchema,
        handler: book_handlers_1.CreateBookHandler,
    });
    route.get('/author', {
        schema: book_schemas_1.ListAuthorsSchema,
        handler: book_handlers_1.ListAuthorsHandler,
    });
    route.post('/author', {
        schema: book_schemas_1.CreateAuthorSchema,
        handler: book_handlers_1.CreateAuthorHandler,
    });
    route.get('/category', {
        schema: book_schemas_1.ListCategoriesSchema,
        handler: book_handlers_1.ListCategoriesHandler,
    });
    route.post('/category', {
        schema: book_schemas_1.CreateCategorySchema,
        handler: book_handlers_1.CreateCategoryHandler,
    });
});
exports.bookRoutes = bookRoutes;
