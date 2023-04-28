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
exports.listPICsByRecordActionAuditId = exports.listPICsByRecordId = exports.listCrewsByRecordId = exports.listCrewsByUpcomingRecordId = exports.executeRecordAction = exports.createRecord = exports.registerRecord = exports.deleteUpcomingRecord = exports.listUpcomingRecords = exports.getUpcomingRecordById = exports.listRecords = void 0;
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
                        owner: { include: { roles: true } },
                    },
                },
                status: true,
                lastPICs: { select: { member: { include: { roles: true } } } },
                members: {
                    select: {
                        member: { include: { roles: true } },
                        recordRole: true,
                        salaryStatus: true,
                    },
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: { select: { author: true } },
                        categories: { select: { category: true } },
                    },
                },
                place: true,
                startedOn: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
    });
}
exports.listRecords = listRecords;
function getUpcomingRecordById(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.findUnique({ where: { id } }), reply);
    });
}
exports.getUpcomingRecordById = getUpcomingRecordById;
function listUpcomingRecords(reply) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.findMany({
            select: {
                id: true,
                title: true,
                sequence: true,
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: { select: { author: true } },
                        categories: { select: { category: true } },
                    },
                },
                place: true,
                startedOn: true,
                members: {
                    select: { member: { include: { roles: true } }, substitute: true },
                    orderBy: [{ substitute: 'asc' }, { member: { name: 'asc' } }],
                },
            },
            orderBy: { startedOn: 'asc' },
        }), reply);
    });
}
exports.listUpcomingRecords = listUpcomingRecords;
function deleteUpcomingRecord(reply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.delete({ where: { id } }), reply);
    });
}
exports.deleteUpcomingRecord = deleteUpcomingRecord;
function registerRecord(reply, _a) {
    var { crewIds, substituteIds } = _a, data = __rest(_a, ["crewIds", "substituteIds"]);
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
                        authors: { select: { author: true } },
                        categories: { select: { category: true } },
                    },
                },
                place: true,
                startedOn: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.membersOnUpcomingRecords.createMany({
            data: [
                ...crewIds.map((id) => ({
                    upcomingRecordId: upcomingRecord.id,
                    memberId: id,
                    substitute: false,
                })),
                ...substituteIds.map((id) => ({
                    upcomingRecordId: upcomingRecord.id,
                    memberId: id,
                    substitute: true,
                })),
            ],
        }), reply);
        return upcomingRecord;
    });
}
exports.registerRecord = registerRecord;
function createRecord(reply, _a, upcomingRecordId) {
    var { members } = _a, data = __rest(_a, ["members"]);
    return __awaiter(this, void 0, void 0, function* () {
        const recorderPICIds = members
            .filter((member) => member.recordRole === 'recording')
            .map(({ id }) => ({ memberId: id }));
        const record = yield (0, utils_1.commitToDB)(prisma_1.default.record.create({
            data: Object.assign(Object.assign({}, data), { lastAction: 'record', lastPICs: { createMany: { data: recorderPICIds } } }),
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
                        owner: { include: { roles: true } },
                    },
                },
                status: true,
                lastPICs: { select: { member: { include: { roles: true } } } },
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: { select: { author: true } },
                        categories: { select: { category: true } },
                    },
                },
                place: true,
                startedOn: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.membersOnRecords.createMany({
            data: members.map((member) => ({
                recordId: record.id,
                memberId: member.id,
                recordRole: member.recordRole,
                salaryStatus: 'unpaid',
            })),
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.recordActionAudit.create({
            data: {
                recordId: record.id,
                action: record.lastAction,
                status: record.status,
                PICs: { createMany: { data: recorderPICIds } },
                locationId: record.location.id,
                performedOn: record.updatedAt.toISOString(),
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.upcomingRecord.delete({ where: { id: upcomingRecordId } }));
        return record;
    });
}
exports.createRecord = createRecord;
function executeRecordAction(reply, recordId, { action: lastAction, status, PICs: lastPICs, locationId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, utils_1.commitToDB)(prisma_1.default.lastPICsOnRecords.deleteMany({ where: { recordId } }));
        const record = yield (0, utils_1.commitToDB)(prisma_1.default.record.update({
            where: { id: recordId },
            data: {
                lastAction,
                status,
                lastPICs: { createMany: { data: lastPICs } },
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
                        owner: { include: { roles: true } },
                    },
                },
                status: true,
                lastPICs: { select: { member: { include: { roles: true } } } },
                members: {
                    select: {
                        member: { include: { roles: true } },
                        recordRole: true,
                        salaryStatus: true,
                    },
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        authors: { select: { author: true } },
                        categories: { select: { category: true } },
                    },
                },
                place: true,
                startedOn: true,
                recordedAt: true,
                updatedAt: true,
            },
        }), reply);
        yield (0, utils_1.commitToDB)(prisma_1.default.recordActionAudit.create({
            data: {
                recordId,
                action: lastAction,
                status: status,
                PICs: { create: lastPICs },
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
        return yield (0, utils_1.commitToDB)(prisma_1.default.membersOnUpcomingRecords.findMany({
            where: { upcomingRecordId },
            select: { member: { include: { roles: true } }, substitute: true },
        }), reply);
    });
}
exports.listCrewsByUpcomingRecordId = listCrewsByUpcomingRecordId;
function listCrewsByRecordId(reply, recordId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.membersOnRecords.findMany({
            where: { recordId },
            select: {
                member: { include: { roles: true } },
                recordRole: true,
                salaryStatus: true,
            },
        }), reply);
    });
}
exports.listCrewsByRecordId = listCrewsByRecordId;
function listPICsByRecordId(reply, recordId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.lastPICsOnRecords.findMany({
            where: { recordId },
            select: { member: { include: { roles: true } } },
        }), reply);
    });
}
exports.listPICsByRecordId = listPICsByRecordId;
function listPICsByRecordActionAuditId(reply, recordActionAuditId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pICsOnRecordActionAudits.findMany({
            where: { recordActionAuditId },
            select: { member: { include: { roles: true } } },
        }), reply);
    });
}
exports.listPICsByRecordActionAuditId = listPICsByRecordActionAuditId;
