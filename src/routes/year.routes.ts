import { Router } from 'express';

import {
    createYear,
    getYears,
    getYearById,
    updateYear,
    deleteYear,
} from '../controllers/year.controller';

import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createYear);

router.get('/', authMiddleware, getYears);

router.get('/:id', authMiddleware, getYearById);
router.put('/', authMiddleware, updateYear);

router.delete('/:id', authMiddleware, deleteYear);

export default router;