import { Router } from 'express';

import {
    createProgram,
    getPrograms,
    getProgramById,
    updateProgram,
    deleteProgram,
} from '../controllers/program.controller';

import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createProgram);

// router.get('/', authMiddleware, getPrograms);

// router.get('/:id', authMiddleware, getProgramById);

// router.put('/', authMiddleware, updateProgram);

// router.delete('/', authMiddleware, deleteProgram);

export default router;