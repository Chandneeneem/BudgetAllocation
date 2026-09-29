import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

import authMiddleware from '../middlewares/auth.middleware';
import { getProfile } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;