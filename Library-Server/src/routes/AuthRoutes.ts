import express from 'express';
import AuthController from '../controllers/AuthController'; 
import { Schemas, ValidateSchema } from "../middleswares/Validation";

const router = express.Router();

// Corrected the route syntax
router.post('/register', ValidateSchema(Schemas.user.create, "body"), AuthController.handleRegister);
router.post("/login", ValidateSchema(Schemas.user.login, "body"), AuthController.handleLogin);

export default router; 
