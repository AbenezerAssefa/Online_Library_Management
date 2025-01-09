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
exports.generateRecord = generateRecord;
exports.modifyRecord = modifyRecord;
exports.findAllRecords = findAllRecords;
exports.queryRecords = queryRecords;
const LoanRecordDao_1 = __importDefault(require("../daos/LoanRecordDao"));
const BookService_1 = require("./BookService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
function generateRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const book = yield (0, BookService_1.findBookById)(record.item);
            if (((_a = book.records[0]) === null || _a === void 0 ? void 0 : _a.status) === 'LOANED') {
                throw new Error('Book is already loaned out.');
            }
            const createdRecord = yield new LoanRecordDao_1.default(record).save();
            book.records = [createdRecord, ...book.records];
            yield (0, BookService_1.modifyBook)(book);
            return createdRecord;
        }
        catch (error) {
            throw error;
        }
    });
}
// Function to modify an existing loan record
function modifyRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedRecord = yield LoanRecordDao_1.default.findOneAndUpdate({ _id: record._id }, record, { new: true });
            if (updatedRecord) {
                let book = yield (0, BookService_1.findBookById)(record.item);
                let records = book.records;
                records[0] = updatedRecord;
                book.records = records;
                yield (0, BookService_1.modifyBook)(book);
                return updatedRecord;
            }
            throw new LibraryErrors_1.LoanRecordDoesNotExist("The record does not exit");
        }
        catch (error) {
            throw error;
        }
    });
}
// Function to retrieve all loan records
function findAllRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao_1.default.find();
        }
        catch (error) {
            throw error;
        }
    });
}
// Function to query loan records by a specific property (e.g., 'status', 'loanedDate')
function queryRecords(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao_1.default.find({ [params.property]: params.value })
                .populate("item")
                .sort("-loanedDate");
        }
        catch (error) {
            throw error;
        }
    });
}
