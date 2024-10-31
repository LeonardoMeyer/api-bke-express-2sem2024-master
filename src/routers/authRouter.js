import express from 'express';
import signupController from '../controllers/auth/signupController.js';
import loginController from '../controllers/auth/loginController.js';
import logoutController from '../controllers/auth/logoutController.js';

const router = express.Router();

router.post('/signup', signupController);      // Registra um novo usuário
router.post('/login', loginController);        // Autentica um usuário
router.post('/logout', logoutController);      // Desconecta um usuário

export default router;
