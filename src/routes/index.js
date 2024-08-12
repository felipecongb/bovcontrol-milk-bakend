import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser, 
    addMilkProduction, 
    updateMilkProduction, 
    deleteMilkProduction 
} from '../controllers/userController.js';
import { 
    createRule, 
    deleteRule, 
    getRuleById, 
    getRules 
} from '../controllers/rulesController.js';
import { getMilkProductionByMonth} from '../controllers/extractController.js';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);

// Rotas CRUD para usuários
router.get('/users',authMiddleware, getAllUsers);
router.post('/users', createUser);
router.get('/users/:id',authMiddleware,  getUserById);
router.put('/users/:id',authMiddleware,  updateUser);
router.delete('/users/:id',authMiddleware,  deleteUser);

// Rotas para produção leiteira dos usuários
router.post('/users/:id/milkProduction', authMiddleware,  addMilkProduction);
router.put('/users/:id/milkProduction/:productionId',authMiddleware,  updateMilkProduction);
router.delete('/users/:id/milkProduction/:productionId',authMiddleware,  deleteMilkProduction);

// Rotas para regras (rules)
router.post('/rules',authMiddleware,  createRule);
router.get('/rules', authMiddleware, getRules);
router.get('/rules/:id',authMiddleware,  getRuleById);
router.delete('/rules/:id',authMiddleware,  deleteRule);

router.get('/milkProduction',authMiddleware,  getMilkProductionByMonth);

export default router;
