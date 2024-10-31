import express from 'express';
import createController from '../controllers/account/createController.js';
import getByIdController from '../controllers/account/getByIdController.js';
import listController from '../controllers/account/listController.js';
import updateController from '../controllers/account/updateController.js';
import removeController from '../controllers/account/removeController.js';

const router = express.Router();

router.post('/', createController);           // Cria uma nova conta
router.get('/list', listController);           // Lista todas as contas
router.get('/:id', getByIdController);         // Busca uma conta por ID
router.put('/:id', updateController);          // Atualiza uma conta específica
router.delete('/:id', removeController);       // Remove uma conta específica

export default router;
