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
exports.listCrewsByRecordId = exports.listCrewsByUpcomingRecordId = exports.executeRecordAction = exports.createRecord = exports.registerRecord = exports.listRecords = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const utils_1 = require("../../utils");
function listRecords(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.record.findMany({
            select: {
                id: true,
                title: true,
                sequence: true,
                lastAction: true,
                location: {
                    select: {
                        id: true,
                        brand: true,
                        device: true,
                        storage: true,
                        owner: true,
                    },
                },
                status: true,
                lastPIC: true,
                crews: { select: { crew: true, role: true, salaryStatus: true } },
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: {
                            select: {
                                author: true,
                            },
                        },
                        category: true,
                    },
                },
                place: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
    });
}
exports.listRecords = listRecords;
function registerRecord(reply, _a) {
    var { crews } = _a, data = __rest(_a, ["crews"]);
    return __awaiter(this, void 0, void 0, function* () {
        const upcomingRecord = yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.create({
            data,
            select: {
                id: true,
                title: true,
                sequence: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: {
                            select: {
                                author: true,
                            },
                        },
                        category: true,
                    },
                },
                place: true,
                startedOn: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.crewsOnUpcomingRecords.createMany({
            data: crews.map((crew) => ({
                upcomingRecordId: upcomingRecord.id,
                crewId: crew.id,
                substitute: crew.substitute,
            })),
        }), reply);
        return upcomingRecord;
    });
}
exports.registerRecord = registerRecord;
function createRecord(reply, _a, upcomingRecordId) {
    var { crews } = _a, data = __rest(_a, ["crews"]);
    return __awaiter(this, void 0, void 0, function* () {
        const recorderPICId = crews.filter((crew) => crew.role === 'recording')[0].id;
        const record = yield (0, utils_1.commitToDB)(prisma_1.default.record.create({
            data: Object.assign(Object.assign({}, data), { lastAction: 'record', lastPICId: recorderPICId }),
            select: {
                id: true,
                title: true,
                sequence: true,
                lastAction: true,
                location: {
                    select: {
                        id: true,
                        brand: true,
                        device: true,
                        storage: true,
                        owner: true,
                    },
                },
                status: true,
                lastPIC: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: {
                            select: {
                                author: true,
                            },
                        },
                        category: true,
                    },
                },
                place: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.crewsOnRecords.createMany({
            data: crews.map((crew) => ({
                recordId: record.id,
                crewId: crew.id,
                role: crew.role,
                salaryStatus: 'unpaid',
            })),
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.recordActionAudit.create({
            data: {
                recordId: record.id,
                action: record.lastAction,
                status: record.status,
                PICId: recorderPICId,
                locationId: record.location.id,
                performedOn: record.updatedAt.toISOString(),
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.delete({ where: { id: upcomingRecordId } }));
        return record;
    });
}
exports.createRecord = createRecord;
function executeRecordAction(reply, recordId, { action: lastAction, status, PICId: lastPICId, locationId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield (0, utils_1.commitToDB)(prisma_1.default.record.update({
            where: { id: recordId },
            data: {
                lastAction,
                status,
                lastPICId,
                locationId,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                title: true,
                sequence: true,
                lastAction: true,
                location: {
                    select: {
                        id: true,
                        brand: true,
                        device: true,
                        storage: true,
                        owner: true,
                    },
                },
                status: true,
                lastPIC: true,
                crews: { select: { crew: true, role: true, salaryStatus: true } },
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: {
                            select: {
                                author: true,
                            },
                        },
                        category: true,
                    },
                },
                place: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.recordActionAudit.create({
            data: {
                recordId,
                action: lastAction,
                status: status,
                PICId: lastPICId,
                locationId,
                performedOn: record.updatedAt.toISOString(),
            },
        }), reply);
        return record;
    });
}
exports.executeRecordAction = executeRecordAction;
function listCrewsByUpcomingRecordId(reply, upcomingRecordId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.crewsOnUpcomingRecords.findMany({
            where: { upcomingRecordId },
            select: { crew: true, substitute: true },
        }), reply);
    });
}
exports.listCrewsByUpcomingRecordId = listCrewsByUpcomingRecordId;
function listCrewsByRecordId(reply, recordId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.crewsOnRecords.findMany({
            where: { recordId },
            select: { crew: true, role: true, salaryStatus: true },
        }), reply);
    });
}
exports.listCrewsByRecordId = listCrewsByRecordId;