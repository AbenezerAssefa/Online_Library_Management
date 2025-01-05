import express from 'express';
import LibraryCardController from '../controllers/LibraryCardController';
import { Schemas, ValidateSchema } from '../middleswares/Validation';

const router = express.Router();

// Route to retrieve a library card by ID
router.get('/:cardId',ValidateSchema(Schemas.libraryCard.get, "params"), LibraryCardController.getLibraryCard);

// Route to create a new library card
router.post('/',ValidateSchema(Schemas.libraryCard.create, "body"), LibraryCardController.createLibraryCard);

export default router;
