import { Request, Response } from 'express';

import * as yearService from '../services/year.service';

export const createYear = async (
    req: Request,
    res: Response
) => {
    try {
        const { year } = req.body;

        const createdYear = await yearService.createYear({
            year,
        });

        return res.status(201).json({
            success: true,
            message: 'Year created successfully',
            data: createdYear,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong',
        });
    }
};

export const getYears = async (
    req: Request,
    res: Response
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || '');

        const years = await yearService.getYears(
            page,
            limit,
            search
        );

        return res.status(200).json({
            success: true,
            data: years,
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
export const getYearById = async (
    req: Request,
    res: Response
) => {
    try {
        const year = await yearService.getYearById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: year,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Year not found',
        });
    }
};

export const updateYear = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, year, status } = req.body;

        const updatedYear = await yearService.updateYear(id, {
            year,
            status,
        });

        return res.status(200).json({
            success: true,
            message: 'Year updated successfully',
            data: updatedYear,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong',
        });
    }
};
export const deleteYear = async (
    req: Request,
    res: Response
) => {
    try {
        await yearService.deleteYear(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Year deleted successfully',
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Year not found',
        });
    }
};