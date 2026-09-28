import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateAccessToken } from '../utils/jwt';
interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};

export const loginUser = async (data: LoginData) => {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const accessToken = generateAccessToken({
        userId: user._id.toString(),
        role: user.role,
    });

    return {
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};