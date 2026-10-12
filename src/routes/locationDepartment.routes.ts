import { Router } from 'express';

import {
    createLocationDepartment,
    getLocationDepartments,
    getLocationDepartmentById,
    updateLocationDepartment,
    deleteLocationDepartment,
} from '../controllers/locationDepartment.controller';

import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createLocationDepartment);

router.get('/', authMiddleware, getLocationDepartments);

router.get('/:id', authMiddleware, getLocationDepartmentById);

router.put('/', authMiddleware, updateLocationDepartment);

router.delete('/', authMiddleware, deleteLocationDepartment);

export default router;