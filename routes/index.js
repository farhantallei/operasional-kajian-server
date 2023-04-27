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
exports.routes = void 0;
const auth_routes_1 = require("../modules/auth/auth.routes");
const book_routes_1 = require("../modules/book/book.routes");
const place_routes_1 = require("../modules/place/place.routes");
const member_routes_1 = require("../modules/member/member.routes");
const storageDevice_routes_1 = require("../modules/storageDevice/storageDevice.routes");
const record_routes_1 = require("../modules/record/record.routes");
const routes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.register(auth_routes_1.authRoutes, { prefix: 'auth' });
    route.register(book_routes_1.bookRoutes, { prefix: 'book' });
    route.register(place_routes_1.placeRoutes, { prefix: 'place' });
    route.register(member_routes_1.memberRoutes, { prefix: 'member' });
    route.register(storageDevice_routes_1.storageDeviceRoutes, { prefix: 'storage-device' });
    route.register(record_routes_1.recordRoutes, { prefix: 'record' });
});
exports.routes = routes;
