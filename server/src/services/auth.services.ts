import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import type { Iuser } from "../types/user.types.js";
import { generateToken } from "../config/jwt.js";

interface UserWithoutPassword {
    _id: string;
    email: string;
}

// user registration service
export const register = async (
    userData: Iuser,
): Promise<{ user: UserWithoutPassword; token: string }> => {
    const { email, password } = userData;

    if (!email) {
        const err = new Error("Email is required");
        (err as any).statusCode = 400;
        throw err;
    }

    if (!password) {
        const err = new Error("Password is required");
        (err as any).statusCode = 400;
        throw err;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const err = new Error("Email already registered");
        (err as any).statusCode = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword
    });

    return {
        user: {
            _id: newUser._id.toString(),
            email: newUser.email,
        },
        token: generateToken(newUser._id.toString())
    };
};


// user login service 
export const login = async (
    data: { email: string; password: string }
): Promise<{ user: UserWithoutPassword; token: string }> => {
    const { email, password } = data;
    if (!email) {
        const err = new Error("Email is required");
        (err as any).statusCode = 400;
        throw err;
    }

    if (!password) {
        const err = new Error("Password is required");
        (err as any).statusCode = 400;
        throw err;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        const err = new Error("Invalid Credentials.");
        (err as any).statusCode = 401;
        throw err;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        const err = new Error("Invalid Credentials.");
        (err as any).statusCode = 401;
        throw err;
    }

    return {
        user: {
            _id: user._id.toString(),
            email: user.email,
        },
        token: generateToken(user._id.toString())
    };
};
