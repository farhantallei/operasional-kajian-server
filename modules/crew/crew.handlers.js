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
exports.CreateCrewHandler = exports.ListCrewsHandler = void 0;
const crew_services_1 = require("./crew.services");
const ListCrewsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const crews = yield (0, crew_services_1.listCrews)(reply);
    return crews;
});
exports.ListCrewsHandler = ListCrewsHandler;
const CreateCrewHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const crew = yield (0, crew_services_1.createCrew)(reply, data);
    return reply.code(201).send(crew);
});
exports.CreateCrewHandler = CreateCrewHandler;
