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
const BookService_1 = require("../services/BookService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
// Function to get all books
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let books = yield (0, BookService_1.findAllBooks)();
            res.status(200).json({ message: "Retrieved all books", count: books.length, books });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to retrieve books at this time", error });
        }
    });
}
// Function to create a new book
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let book = req.body;
        try {
            let savedBook = yield (0, BookService_1.registerBook)(book);
            res.status(201).json({
                message: "Book created successfully",
                savedBook
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Unable to save book at this time",
                error
            });
        }
    });
}
// Function to update an existing book
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let book = req.body;
        try {
            let updatedBook = yield (0, BookService_1.modifyBook)(book);
            res.status(202).json({ message: "Book updated successfully", updatedBook });
        }
        catch (error) {
            if (error instanceof LibraryErrors_1.BookDoesNotExistError) {
                res.status(404).json({ message: "Cannot update book that does not exist" });
            }
            else {
                res.status(500).json({ message: "Book updated successfully", error });
            }
        }
    });
}
// Function to remove a book
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { barcode } = req.params;
        try {
            let message = yield (0, BookService_1.removeBook)(barcode);
            res.status(202).json({
                message
            });
        }
        catch (error) {
            if (error instanceof LibraryErrors_1.BookDoesNotExistError) {
                res.status(404).json({ message: "Cannot delete a book that does not exist", error });
            }
            else {
                res.status(500).json({
                    message: "Unable to delete book at this time",
                    error
                });
            }
        }
    });
}
function searchForBooksByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { title, barcode, author, description, subject, genre, page = 1, limit = 25, } = req.query;
        // Fetch books based on the query
        let books = yield (0, BookService_1.queryBooks)(Number(page), Number(limit), title, barcode, description, author, subject, genre);
        res.status(200).json({ message: "Retrieved books from query", page: books,
        });
    });
}
// Export default object
exports.default = { getAllBooks, createBook, updateBook, deleteBook, searchForBooksByQuery };
