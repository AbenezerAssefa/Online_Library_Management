import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import { IUser } from '../models/User';
import { IUserModel } from '../daos/UserDao';
import { IBook } from '../models/Book';
import { IBookModel } from '../daos/BookDao';
import { ILibraryCard } from '../models/LibraryCard';
import { ILoanRecord } from '../models/LoanRecord';
import { ILoanRecordModel } from '../daos/LoanRecordDao';

// Constants for regex patterns
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BarcodeRegex = /^(?=(?:\D*\d){10}(?:\D*\d){3})?$|^[\d-]+$/;

// Validation middleware function
export function ValidateSchema(schema: ObjectSchema, property: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      switch (property) {
        case 'query':
          await schema.validateAsync(req.query);
          break;
        case 'params':
          await schema.validateAsync(req.params);
          break;
        default:
          await schema.validateAsync(req.body);
      }
      next(); // Proceed if validation succeeds
    } catch (error) {
      // Type guard to ensure the error has a `details` property
      if (error instanceof Joi.ValidationError) {
        res.status(422).json({ message: error.details[0].message }); // Send detailed validation error
      } else {
        res.status(500).json({ message: 'An unexpected error occurred during validation' }); // Fallback for unknown errors
      }
    }
  };
}


// Define Joi validation schemas
export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().regex(EmailRegex).required(),
      password: Joi.string().required(),
    }),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string().regex(EmailRegex).required(),
      password: Joi.string().required(),
    }),
    userId: Joi.object<{ userId: string }>({
      userId: Joi.string().regex(ObjectIdRegex).required(),
    }),
    update: Joi.object<IUserModel>({
      _id: Joi.string().regex(ObjectIdRegex).required(),
      type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().regex(EmailRegex).required(),
      password: Joi.string().optional(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      barcode: Joi.string().regex(BarcodeRegex).required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().items(Joi.string()).required(),
      description: Joi.string().required(),
      subjects: Joi.array().items(Joi.string()).required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
    }),
    update: Joi.object<IBookModel>({
      _id: Joi.string().regex(ObjectIdRegex).required(),
      barcode: Joi.string().regex(BarcodeRegex).required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().items(Joi.string()).required(),
      description: Joi.string().required(),
      subjects: Joi.array().items(Joi.string()).required(),
      publicationDate: Joi.date().required(),
      publisher: Joi.string().required(),
      pages: Joi.number().required(),
      genre: Joi.string().required(),
     
    }),
    delete: Joi.object<{ barcode: string }>({
      barcode: Joi.string().regex(BarcodeRegex).required(),
    }),
  },
  libraryCard: {
    create: Joi.object<ILibraryCard>({
      user: Joi.string().regex(ObjectIdRegex).required(),
    }),
    get: Joi.object<{ cardId: string }>({
      cardId: Joi.string().regex(ObjectIdRegex).required(),
    }),
  },
  loan: {
    create: Joi.object<ILoanRecord>({
      status: Joi.string().valid('AVAILABLE', 'LOANED').required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string().regex(ObjectIdRegex).required(),
      employeeOut: Joi.string().regex(ObjectIdRegex).required(),
      employeeIn: Joi.string().regex(ObjectIdRegex).optional(),
      item: Joi.string().regex(ObjectIdRegex).required(),
    }),
    update: Joi.object<ILoanRecordModel>({
      _id: Joi.string().regex(ObjectIdRegex).required(),
      status: Joi.string().valid('AVAILABLE', 'LOANED').required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string().regex(ObjectIdRegex).required(),
      employeeOut: Joi.string().regex(ObjectIdRegex).required(),
      employeeIn: Joi.string().regex(ObjectIdRegex).optional(),
      item: Joi.string().regex(ObjectIdRegex).required(),
    }),
    query: Joi.object<{ property: string; value: string | Date }>({
      property: Joi.string()
        .valid('_id', 'status', 'loanedDate', 'dueDate', 'returnedDate', 'patron', 'employeeOut', 'employeeIn', 'item')
        .required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
