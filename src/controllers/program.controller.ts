import { Request, Response } from 'express';

import * as programService from '../services/program.service';

// Create Program
export const createProgram = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, description } = req.body;

        const program = await programService.createProgram({
            name,
            description,
        });

        return res.status(201).json({
            success: true,
            message: 'Program created successfully',
            data: program,
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

// // Get all Programs
export const getPrograms = async (
    req: Request,
    res: Response
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const search =
            typeof req.query.search === 'string'
                ? req.query.search
                : undefined;

        const programs = await programService.getPrograms({
            page,
            limit,
            search,
        });

        return res.status(200).json({
            success: true,
            ...programs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong',
        });
    }
};

// // Get Program by ID
// export const getProgramById = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const { id } = req.params;

//         const program =
//             await programService.getProgramById(id);

//         return res.status(200).json({
//             success: true,
//             data: program,
//         });
//     } catch (error) {
//         return res.status(404).json({
//             success: false,
//             message:
//                 error instanceof Error
//                     ? error.message
//                     : 'Program not found',
//         });
//     }
// };

// // Update Program
export const updateProgram = async (
    req: Request,
    res: Response
) => {
    try {
        const { id, name, description } = req.body;

        const program =
            await programService.updateProgram({
                id,
                name,
                description,
            });

        return res.status(200).json({
            success: true,
            message: 'Program updated successfully',
            data: program,
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

// // Delete Program
export const deleteProgram = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.body;

        const program =
            await programService.deleteProgram(id);

        return res.status(200).json({
            success: true,
            message: 'Program deleted successfully',
            data: program,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Program not found',
        });
    }
};