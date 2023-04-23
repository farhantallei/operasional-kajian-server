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
exports.ExecuteRecordActionHandler = exports.CreateRecordHandler = exports.RegisterRecordHandler = exports.ListUpcomingRecordsHandler = exports.ListRecordsHandler = void 0;
const record_services_1 = require("./record.services");
const ListRecordsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield (0, record_services_1.listRecords)(reply);
    return records.map((_a) => {
        var { crews, book, place, recordedAt, updatedAt } = _a, record = __rest(_a, ["crews", "book", "place", "recordedAt", "updatedAt"]);
        return (Object.assign(Object.assign({}, record), { crews: crews.map(({ crew, role, salaryStatus }) => (Object.assign(Object.assign({}, crew), { role,
                salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
    });
});
exports.ListRecordsHandler = ListRecordsHandler;
const ListUpcomingRecordsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const upcomingRecords = yield (0, record_services_1.listUpcomingRecords)(reply);
    return upcomingRecords.map((_a) => {
        var { crews, book, place, startedOn } = _a, upcomingRecord = __rest(_a, ["crews", "book", "place", "startedOn"]);
        return (Object.assign(Object.assign({}, upcomingRecord), { book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString(), crews: crews.map(({ crew, substitute }) => (Object.assign(Object.assign({}, crew), { substitute }))) }));
    });
});
exports.ListUpcomingRecordsHandler = ListUpcomingRecordsHandler;
const RegisterRecordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const _a = yield (0, record_services_1.registerRecord)(reply, data), { book, place, startedOn } = _a, upcomingRecord = __rest(_a, ["book", "place", "startedOn"]);
    const crews = yield (0, record_services_1.listCrewsByUpcomingRecordId)(reply, upcomingRecord.id);
    return reply.code(201).send(Object.assign(Object.assign({}, upcomingRecord), { crews: crews.map(({ crew, substitute }) => (Object.assign(Object.assign({}, crew), { substitute }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), startedOn: startedOn.toISOString() }));
});
exports.RegisterRecordHandler = RegisterRecordHandler;
const CreateRecordHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    const { upcomingRecordId } = request.params;
    const _b = yield (0, record_services_1.createRecord)(reply, data, upcomingRecordId), { book, place, recordedAt, updatedAt } = _b, record = __rest(_b, ["book", "place", "recordedAt", "updatedAt"]);
    const crews = yield (0, record_services_1.listCrewsByRecordId)(reply, record.id);
    return reply.code(201).send(Object.assign(Object.assign({}, record), { crews: crews.map(({ crew, role, salaryStatus }) => (Object.assign(Object.assign({}, crew), { role,
            salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
});
exports.CreateRecordHandler = CreateRecordHandler;
const ExecuteRecordActionHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = request.body, { id } = _c, data = __rest(_c, ["id"]);
    const _d = yield (0, record_services_1.executeRecordAction)(reply, id, data), { crews, book, place, recordedAt, updatedAt } = _d, record = __rest(_d, ["crews", "book", "place", "recordedAt", "updatedAt"]);
    return reply.send(Object.assign(Object.assign({}, record), { crews: crews.map(({ crew, role, salaryStatus }) => (Object.assign(Object.assign({}, crew), { role,
            salaryStatus }))), book: Object.assign(Object.assign({}, book), { authors: book.authors.map(({ author }) => (Object.assign({}, author))) }), place: Object.assign(Object.assign({}, place), { latitude: place.latitude.toNumber(), longitude: place.longitude.toNumber() }), recordedAt: recordedAt.toISOString(), updatedAt: updatedAt.toISOString() }));
});
exports.ExecuteRecordActionHandler = ExecuteRecordActionHandler;
