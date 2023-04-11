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
exports.CreateStorageDeviceHandler = exports.ListStorageDevicesHandler = exports.CreateDeviceHandler = exports.ListDevicesHandler = void 0;
const storageDevice_services_1 = require("./storageDevice.services");
const ListDevicesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const devices = yield (0, storageDevice_services_1.listDevices)(reply);
    return devices;
});
exports.ListDevicesHandler = ListDevicesHandler;
const CreateDeviceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const device = yield (0, storageDevice_services_1.createDevice)(reply, data);
    return reply.code(201).send(device);
});
exports.CreateDeviceHandler = CreateDeviceHandler;
const ListStorageDevicesHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const storageDevices = yield (0, storageDevice_services_1.listStorageDevices)(reply);
    return storageDevices;
});
exports.ListStorageDevicesHandler = ListStorageDevicesHandler;
const CreateStorageDeviceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const storageDevice = yield (0, storageDevice_services_1.createStorageDevice)(reply, data);
    return reply.code(201).send(storageDevice);
});
exports.CreateStorageDeviceHandler = CreateStorageDeviceHandler;
