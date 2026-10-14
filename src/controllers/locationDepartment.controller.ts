import { Request, Response } from 'express';

import * as locationDepartmentService from '../services/locationDepartment.service';

// Create Location Department
export const createLocationDepartment = async (
    req: Request,
    res: Response
) => {
    try {
        const { locationName, programCenterId, description } = req.body;

        const department =
            await locationDepartmentService.createLocationDepartment({
                locationName,
                programCenterId,
                description,
            });

        return res.status(201).json({
            success: true,
            message: 'Location department created successfully',
            data: department,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Something went wrong',
        });
    }
};

// Get all Location Departments
export const getLocationDepartments = async (
    req: Request,
    res: Response
) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit) || 10);

        const search =
            typeof req.query.search === 'string'
                ? req.query.search
                : undefined;

        const departments =
            await locationDepartmentService.getLocationDepartments({
                page,
                limit,
                search,
            });

        return res.status(200).json({
            success: true,
            ...departments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Something went wrong',
        });
    }
};

// Get Location Department by ID
export const getLocationDepartmentById = async (
    req: Request,
    res: Response
) => {
    try {
        const department =
            await locationDepartmentService.getLocationDepartmentById(
                req.params.id as string
            );

        return res.status(200).json({
            success: true,
            data: department,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Location department not found',
        });
    }
};

// Update Location Department
export const updateLocationDepartment = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, locationName, programCenterId, description } = req.body;

        const department =
            await locationDepartmentService.updateLocationDepartment({
                id,
                locationName,
                programCenterId,
                description,
            });

        return res.status(200).json({
            success: true,
            message: 'Location department updated successfully',
            data: department,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Something went wrong',
        });
    }
};

// Delete Location Department
export const deleteLocationDepartment = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.body;

        const department =
            await locationDepartmentService.deleteLocationDepartment(id);

        return res.status(200).json({
            success: true,
            message: 'Location department deleted successfully',
            data: department,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Location department not found',
        });
    }
};