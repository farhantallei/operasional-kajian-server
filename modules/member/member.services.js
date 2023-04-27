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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRolesByMemberId = exports.createMember = exports.listOperators = exports.listMembers = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const utils_1 = require("../../utils");
function listMembers(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.member.findMany({
            include: { roles: true },
            orderBy: { name: 'asc' },
        }), reply);
    });
}
exports.listMembers = listMembers;
function listOperators(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.member.findMany({
            select: { id: true, name: true },
            where: { roles: { every: { role: 'operator' } } },
            orderBy: { name: 'asc' },
        }), reply).then((members) => members.map(({ id, name }) => ({ label: name, value: id })));
    });
}
exports.listOperators = listOperators;
function createMember(reply, _a) {
    var { roles } = _a, data = __rest(_a, ["roles"]);
    return __awaiter(this, void 0, void 0, function* () {
        const member = yield (0, utils_1.commitToDB)(prisma_1.default.member.create({ data }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.memberRole.createMany({
            data: roles.map((role) => ({ memberId: member.id, role })),
        }), reply);
        return member;
    });
}
exports.createMember = createMember;
function listRolesByMemberId(reply, memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.memberRole.findMany({ where: { memberId } }), reply);
    });
}
exports.listRolesByMemberId = listRolesByMemberId;
