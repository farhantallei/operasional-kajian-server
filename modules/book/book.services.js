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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCategory = exports.createCategory = exports.listCategoriesByBookId = exports.listCategories = exports.checkAuthor = exports.createAuthor = exports.listAuthorsByBookId = exports.listAuthors = exports.createBook = exports.listBooks = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const utils_1 = require("../../utils");
function listBooks(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.book.findMany({
            select: {
                id: true,
                title: true,
            },
            orderBy: { title: 'asc' },
        }), reply).then((books) => books.map(({ id, title }) => ({ label: title, value: id })));
    });
}
exports.listBooks = listBooks;
function createBook(reply, { title, authorIds, categoryIds, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield (0, utils_1.commitToDB)(prisma_1.default.book.create({
            data: { title },
            select: { id: true, title: true },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.authorsOnBooks.createMany({
            data: authorIds.map((id) => ({ bookId: book.id, authorId: id })),
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.categoriesOnBooks.createMany({
            data: categoryIds.map((id) => ({ bookId: book.id, categoryId: id })),
        }), reply);
        return book;
    });
}
exports.createBook = createBook;
function listAuthors(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.author.findMany({ orderBy: { name: 'asc' } }), reply).then((categories) => categories.map(({ id, name }) => ({ label: name, value: id })));
    });
}
exports.listAuthors = listAuthors;
function listAuthorsByBookId(reply, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.authorsOnBooks.findMany({
            where: { bookId },
            select: { author: true },
        }), reply);
    });
}
exports.listAuthorsByBookId = listAuthorsByBookId;
function createAuthor(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.author.create({ data }), reply);
    });
}
exports.createAuthor = createAuthor;
function checkAuthor(reply, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.author.count({ where: { name } }), reply).then((count) => !!count);
    });
}
exports.checkAuthor = checkAuthor;
function listCategories(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.category.findMany({ orderBy: { name: 'asc' } }), reply).then((categories) => categories.map(({ id, name }) => ({ label: name, value: id })));
    });
}
exports.listCategories = listCategories;
function listCategoriesByBookId(reply, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.categoriesOnBooks.findMany({
            where: { bookId },
            select: { category: true },
        }), reply);
    });
}
exports.listCategoriesByBookId = listCategoriesByBookId;
function createCategory(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.category.create({ data }), reply);
    });
}
exports.createCategory = createCategory;
function checkCategory(reply, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.category.count({ where: { name } }), reply).then((count) => !!count);
    });
}
exports.checkCategory = checkCategory;
