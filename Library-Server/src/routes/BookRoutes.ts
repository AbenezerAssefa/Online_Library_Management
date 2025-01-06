import express from 'express';
import BookController from "../controllers/BookController";
import { Schemas, ValidateSchema } from '../middleswares/Validation'; // Path should be correct

const router = express.Router();

// Route to get all books
router.get('/', BookController.getAllBooks);

// Route to create a new book
router.post('/', ValidateSchema(Schemas.book.create, "body"), BookController.createBook);

// Route to update an existing book by barcode (preferably specify barcode in the URL as a parameter)
router.put('/', ValidateSchema(Schemas.book.update, "body"), BookController.updateBook);

// Route to delete a book by barcode
router.delete('/:barcode', ValidateSchema(Schemas.book.delete, "params"), BookController.deleteBook);




// Route to query books based on search criteria
router.get("/query", BookController.searchForBooksByQuery);

export = router;
