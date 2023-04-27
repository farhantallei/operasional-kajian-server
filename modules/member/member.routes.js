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
exports.memberRoutes = void 0;
const member_handlers_1 = require("./member.handlers");
const member_schemas_1 = require("./member.schemas");
const middleware_1 = require("../../middleware");
const memberRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', middleware_1.authentication);
    route.get('/', {
        schema: member_schemas_1.ListMembersSchema,
        handler: member_handlers_1.ListMembersHandler,
    });
    route.get('/operator', {
        schema: member_schemas_1.ListCrewsSchema,
        handler: member_handlers_1.ListOperatorsHandler,
    });
    route.post('/', {
        schema: member_schemas_1.CreateMemberSchema,
        handler: member_handlers_1.CreateMemberHandler,
    });
});
exports.memberRoutes = memberRoutes;
