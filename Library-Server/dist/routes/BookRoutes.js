"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = __importDefault(require("../controllers/BookController"));
const Validation_1 = require("../middleswares/Validation");
const router = express_1.default.Router();
// Route to get all books
router.get('/', BookController_1.default.getAllBooks);
// Route to create a new book
router.post('/', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.book.create, "body"), BookController_1.default.createBook);
// Route to update an existing book
router.put('/', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.book.update, "body"), BookController_1.default.updateBook);
// Route to delete a book by barcode
router.delete('/:barcode', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.book.delete, "params"), BookController_1.default.deleteBook);
// Route to query books based on search criteria (e.g., title, author, genre)
router.get("/query", BookController_1.default.searchForBooksByQuery);
exports.default = router;
