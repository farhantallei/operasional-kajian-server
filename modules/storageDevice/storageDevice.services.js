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
exports.createStorageDevice = exports.listStorageDevices = exports.createDevice = exports.listDevices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const utils_1 = require("../../utils");
function listDevices(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.device.findMany(), reply);
    });
}
exports.listDevices = listDevices;
function createDevice(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.device.create({ data }), reply);
    });
}
exports.createDevice = createDevice;
function listStorageDevices(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.storageDevice.findMany({
            select: {
                id: true,
                brand: true,
                device: true,
                storage: true,
                owner: true,
            },
        }), reply);
    });
}
exports.listStorageDevices = listStorageDevices;
function createStorageDevice(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.storageDevice.create({
            data,
            select: {
                id: true,
                brand: true,
                device: true,
                storage: true,
                owner: true,
            },
        }), reply);
    });
}
exports.createStorageDevice = createStorageDevice;
