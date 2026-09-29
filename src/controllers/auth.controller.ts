import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';

import { loginUser } from '../services/auth.service';
import { getUserProfile } from '../services/auth.service';

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Something went wrong',
        });
    }
};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        //  console.log('LOGIN BODY:', req.body);
        const data = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Login failed',
        });
    }
};

export const getProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
            return;
        }

        const user = await getUserProfile(userId);

        res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Something went wrong',
        });
    }
};