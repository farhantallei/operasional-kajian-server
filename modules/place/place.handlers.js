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
exports.CreatePlaceHandler = exports.ListPlacesHandler = void 0;
const place_services_1 = require("./place.services");
const ListPlacesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield (0, place_services_1.listPlaces)(reply);
    return places;
});
exports.ListPlacesHandler = ListPlacesHandler;
const CreatePlaceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const place = yield (0, place_services_1.createPlace)(reply, data);
    return reply.code(201).send(place);
});
exports.CreatePlaceHandler = CreatePlaceHandler;
