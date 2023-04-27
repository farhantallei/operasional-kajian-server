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
exports.CreateMemberHandler = exports.ListOperatorsHandler = exports.ListMembersHandler = void 0;
const member_services_1 = require("./member.services");
const ListMembersHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield (0, member_services_1.listMembers)(reply);
    return members;
});
exports.ListMembersHandler = ListMembersHandler;
const ListOperatorsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, member_services_1.listOperators)(reply);
});
exports.ListOperatorsHandler = ListOperatorsHandler;
const CreateMemberHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const member = yield (0, member_services_1.createMember)(reply, data);
    const roles = yield (0, member_services_1.listRolesByMemberId)(reply, member.id);
    return reply.code(201).send(Object.assign(Object.assign({}, member), { roles }));
});
exports.CreateMemberHandler = CreateMemberHandler;
