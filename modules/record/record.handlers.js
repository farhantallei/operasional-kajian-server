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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteRecordActionHandler = exports.CreateRecordHandler = exports.RegisterRecordHandler = exports.DeleteUpcomingRecordHandler = exports.ListUpcomingRecordsHandler = exports.ListRecordsHandler = void 0;
const record_services_1 = require("./record.services");
const ListRecordsHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield (0, record_services_1.listRecords)(reply);
    return records.map((_a) => {
        var { lastPICs, members, book, place, startedOn, recordedAt, updatedAt } = _a, record = __rest(_a, ["lastPICs", "members", "book", "place", "startedOn", "recordedAt", "updatedAt"]);
        return (Object.assign(Object.assign({}, record), { lastPICs: lastPICs.map(({ member }) => (Object.assign({}, member))), members: members.map(({ member, recordRole, salaryStatus }) => (Object.assign(Object.assign({}, member), { recordRole,
                salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))), categories: book.categories.map(({ category }) => (Object.assign({}, category))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString(), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
    });
});
exports.ListRecordsHandler = ListRecordsHandler;
const ListUpcomingRecordsHandler = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const upcomingRecords = yield (0, record_services_1.listUpcomingRecords)(reply);
    return upcomingRecords.map((_a) => {
        var { members, book, place, startedOn } = _a, upcomingRecord = __rest(_a, ["members", "book", "place", "startedOn"]);
        return (Object.assign(Object.assign({}, upcomingRecord), { book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))), categories: book.categories.map(({ category }) => (Object.assign({}, category))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString(), members: members.map(({ member, substitute }) => (Object.assign(Object.assign({}, member), { substitute }))) }));
    });
});
exports.ListUpcomingRecordsHandler = ListUpcomingRecordsHandler;
const DeleteUpcomingRecordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const isUpcomingRecordExists = yield (0, record_services_1.getUpcomingRecordById)(reply, id);
    if (!isUpcomingRecordExists)
        return reply.notFound('Upcoming Record is not found.');
    yield (0, record_services_1.deleteUpcomingRecord)(reply, id);
    return reply.code(204).send({});
});
exports.DeleteUpcomingRecordHandler = DeleteUpcomingRecordHandler;
const RegisterRecordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const hasSameId = data.crewIds.some((id) => data.substituteIds.includes(id));
    if (hasSameId)
        return reply.badRequest('Cannot use the same id.');
    const _a = yield (0, record_services_1.registerRecord)(reply, data), { book, place, startedOn } = _a, upcomingRecord = __rest(_a, ["book", "place", "startedOn"]);
    const members = yield (0, record_services_1.listCrewsByUpcomingRecordId)(reply, upcomingRecord.id);
    return reply.code(201).send(Object.assign(Object.assign({}, upcomingRecord), { members: members.map(({ member, substitute }) => (Object.assign(Object.assign({}, member), { substitute }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))), categories: book.categories.map(({ category }) => (Object.assign({}, category))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString() }));
});
exports.RegisterRecordHandler = RegisterRecordHandler;
const CreateRecordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const { upcomingRecordId } = request.params;
    const _b = yield (0, record_services_1.createRecord)(reply, data, upcomingRecordId), { book, place, startedOn, recordedAt, updatedAt } = _b, record = __rest(_b, ["book", "place", "startedOn", "recordedAt", "updatedAt"]);
    const members = yield (0, record_services_1.listCrewsByRecordId)(reply, record.id);
    const PICs = yield (0, record_services_1.listPICsByRecordId)(reply, record.id);
    return reply.code(201).send(Object.assign(Object.assign({}, record), { lastPICs: PICs.map(({ member }) => (Object.assign({}, member))), members: members.map(({ member, recordRole, salaryStatus }) => (Object.assign(Object.assign({}, member), { recordRole,
            salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))), categories: book.categories.map(({ category }) => (Object.assign({}, category))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString(), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
});
exports.CreateRecordHandler = CreateRecordHandler;
const ExecuteRecordActionHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = request.body, { id, PICIds } = _c, data = __rest(_c, ["id", "PICIds"]);
    const _d = yield (0, record_services_1.executeRecordAction)(reply, id, Object.assign(Object.assign({}, data), { PICs: PICIds.map((id) => ({ memberId: id })) })), { lastPICs, members, book, place, startedOn, recordedAt, updatedAt } = _d, record = __rest(_d, ["lastPICs", "members", "book", "place", "startedOn", "recordedAt", "updatedAt"]);
    return reply.send(Object.assign(Object.assign({}, record), { lastPICs: lastPICs.map(({ member }) => (Object.assign({}, member))), members: members.map(({ member, recordRole, salaryStatus }) => (Object.assign(Object.assign({}, member), { recordRole,
            salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))), categories: book.categories.map(({ category }) => (Object.assign({}, category))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString(), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
});
exports.ExecuteRecordActionHandler = ExecuteRecordActionHandler;
