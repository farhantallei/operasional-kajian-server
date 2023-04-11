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
exports.placeRoutes = void 0;
const place_handlers_1 = require("./place.handlers");
const place_schemas_1 = require("./place.schemas");
const middleware_1 = require("../../middleware");
const placeRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', middleware_1.authentication);
    route.get('/', {
        schema: place_schemas_1.ListPlacesSchema,
        handler: place_handlers_1.ListPlacesHandler,
    });
    route.post('/', {
        schema: place_schemas_1.CreatePlaceSchema,
        handler: place_handlers_1.CreatePlaceHandler,
    });
});
exports.placeRoutes = placeRoutes;
