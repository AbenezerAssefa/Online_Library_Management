"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRecordDoesNotExist = exports.LibraryCardDoesNotExistError = exports.BookDoesNotExistError = exports.UserDoesNotExistError = exports.InvalidUsernameOrPasswordError = exports.UnableToSaveUserError = void 0;
class UnableToSaveUserError extends Error {
    constructor(message) {
        super(message); // Pass the message to the parent Error class
    }
}
exports.UnableToSaveUserError = UnableToSaveUserError;
class InvalidUsernameOrPasswordError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidUsernameOrPasswordError = InvalidUsernameOrPasswordError;
class UserDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
class BookDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BookDoesNotExistError = BookDoesNotExistError;
class LibraryCardDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LibraryCardDoesNotExistError = LibraryCardDoesNotExistError;
class LoanRecordDoesNotExist extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LoanRecordDoesNotExist = LoanRecordDoesNotExist;
