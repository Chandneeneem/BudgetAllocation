import bcrypt from 'bcryptjs';
import User from '../models/user.model';

interface RegisterData {
    name: string;
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