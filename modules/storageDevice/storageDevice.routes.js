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
exports.storageDeviceRoutes = void 0;
const storageDevice_handlers_1 = require("./storageDevice.handlers");
const storageDevice_schemas_1 = require("./storageDevice.schemas");
const storageDeviceRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: storageDevice_schemas_1.ListStorageDevicesSchema,
        handler: storageDevice_handlers_1.ListStorageDevicesHandler,
    });
    route.post('/', {
        schema: storageDevice_schemas_1.CreateStorageDeviceSchema,
        handler: storageDevice_handlers_1.CreateStorageDeviceHandler,
    });
    route.get('/device', {
        schema: storageDevice_schemas_1.ListDevicesSchema,
        handler: storageDevice_handlers_1.ListDevicesHandler,
    });
    route.post('/device', {
        schema: storageDevice_schemas_1.CreateDeviceSchema,
        handler: storageDevice_handlers_1.CreateDeviceHandler,
    });
});
exports.storageDeviceRoutes = storageDeviceRoutes;
