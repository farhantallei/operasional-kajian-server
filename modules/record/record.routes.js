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
exports.recordRoutes = void 0;
const record_handlers_1 = require("./record.handlers");
const record_schemas_1 = require("./record.schemas");
const middleware_1 = require("../../middleware");
const recordRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.addHook('preHandler', middleware_1.authentication);
    route.get('/', {
        schema: record_schemas_1.ListRecordsSchema,
        handler: record_handlers_1.ListRecordsHandler,
    });
    route.get('/upcoming', {
        schema: record_schemas_1.ListUpcomingRecordsSchema,
        handler: record_handlers_1.ListUpcomingRecordsHandler,
    });
    route.post('/', {
        schema: record_schemas_1.RegisterRecordSchema,
        handler: record_handlers_1.RegisterRecordHandler,
    });
    route.post('/:upcomingRecordId', {
        schema: record_schemas_1.CreateRecordSchema,
        handler: record_handlers_1.CreateRecordHandler,
    });
    route.post('/action', {
        schema: record_schemas_1.ExecuteRecordActionSchema,
        handler: record_handlers_1.ExecuteRecordActionHandler,
    });
    route.delete('/upcoming/:id', {
        schema: record_schemas_1.DeleteUpcomingRecordSchema,
        handler: record_handlers_1.DeleteUpcomingRecordHandler,
    });
});
exports.recordRoutes = recordRoutes;
