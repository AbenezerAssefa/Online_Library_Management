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
exports.Schemas = void 0;
exports.ValidateSchema = ValidateSchema;
const joi_1 = __importDefault(require("joi"));
// Constants for regex patterns
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BarcodeRegex = /^(?=(?:\D*\d){10}(?:\D*\d){3})?$|^[\d-]+$/;
// Validation middleware function
function ValidateSchema(schema, property) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (property) {
                case 'query':
                    yield schema.validateAsync(req.query);
                    break;
                case 'params':
                    yield schema.validateAsync(req.params);
                    break;
                default:
                    yield schema.validateAsync(req.body);
            }
            next(); // Proceed if validation succeeds
        }
        catch (error) {
            // Type guard to ensure the error has a `details` property
            if (error instanceof joi_1.default.ValidationError) {
                res.status(422).json({ message: error.details[0].message }); // Send detailed validation error
            }
            else {
                res.status(500).json({ message: 'An unexpected error occurred during validation' }); // Fallback for unknown errors
            }
        }
    });
}
// Define Joi validation schemas
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            type: joi_1.default.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().regex(EmailRegex).required(),
            password: joi_1.default.string().required(),
        }),
        login: joi_1.default.object({
            email: joi_1.default.string().regex(EmailRegex).required(),
            password: joi_1.default.string().required(),
        }),
        userId: joi_1.default.object({
            userId: joi_1.default.string().regex(ObjectIdRegex).required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(ObjectIdRegex).required(),
            type: joi_1.default.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().regex(EmailRegex).required(),
            password: joi_1.default.string().optional(),
        }),
    },
    book: {
        create: joi_1.default.object({
            barcode: joi_1.default.string().regex(BarcodeRegex).required(),
            cover: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            authors: joi_1.default.array().items(joi_1.default.string()).required(),
            description: joi_1.default.string().required(),
            subjects: joi_1.default.array().items(joi_1.default.string()).required(),
            publicationDate: joi_1.default.date().required(),
            publisher: joi_1.default.string().required(),
            pages: joi_1.default.number().required(),
            genre: joi_1.default.string().required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(ObjectIdRegex).required(),
            barcode: joi_1.default.string().regex(BarcodeRegex).required(),
            cover: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            authors: joi_1.default.array().items(joi_1.default.string()).required(),
            description: joi_1.default.string().required(),
            subjects: joi_1.default.array().items(joi_1.default.string()).required(),
            publicationDate: joi_1.default.date().required(),
            publisher: joi_1.default.string().required(),
            pages: joi_1.default.number().required(),
            genre: joi_1.default.string().required(),
        }),
        delete: joi_1.default.object({
            barcode: joi_1.default.string().regex(BarcodeRegex).required(),
        }),
    },
    libraryCard: {
        create: joi_1.default.object({
            user: joi_1.default.string().regex(ObjectIdRegex).required(),
        }),
        get: joi_1.default.object({
            cardId: joi_1.default.string().regex(ObjectIdRegex).required(),
        }),
    },
    loan: {
        create: joi_1.default.object({
            status: joi_1.default.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            patron: joi_1.default.string().regex(ObjectIdRegex).required(),
            employeeOut: joi_1.default.string().regex(ObjectIdRegex).required(),
            employeeIn: joi_1.default.string().regex(ObjectIdRegex).optional(),
            item: joi_1.default.string().regex(ObjectIdRegex).required(),
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().regex(ObjectIdRegex).required(),
            status: joi_1.default.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            returnedDate: joi_1.default.date(),
            patron: joi_1.default.string().regex(ObjectIdRegex).required(),
            employeeOut: joi_1.default.string().regex(ObjectIdRegex).required(),
            employeeIn: joi_1.default.string().regex(ObjectIdRegex).optional(),
            item: joi_1.default.string().regex(ObjectIdRegex).required(),
        }),
        query: joi_1.default.object({
            property: joi_1.default.string()
                .valid('_id', 'status', 'loanedDate', 'dueDate', 'returnedDate', 'patron', 'employeeOut', 'employeeIn', 'item')
                .required(),
            value: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.date()).required(),
        }),
    },
};
