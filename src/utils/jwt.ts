import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1h',
        }
    );
};