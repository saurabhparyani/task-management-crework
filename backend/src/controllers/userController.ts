import express, {Request, Response} from "express"
import bcrypt from "bcrypt";
import UserModel from '../db/models/users';
import { signupSchema, loginSchema } from "../validators/userValidator";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res:Response) => {
    const createPayload = req.body;
    const parsedPayload = signupSchema.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Email is already taken / Incorrect inputs"
        })
        return;
    }

    try {
        const existingUser = await UserModel.findOne({ email: createPayload.email });
        if(existingUser) {
            res.status(411).json({
                message: "Email already exists!"
            })
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createPayload.password, saltRounds)

        const newUser = await UserModel.create({
            fullName: createPayload.fullName,
            email: createPayload.email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id.toString());

        res.status(200).json({
            message: "User created successfully",
            token: token
        })

    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }

}

export const login = async (req:Request, res:Response) => {
    const createPayload = req.body;
    const parsedPayload = loginSchema.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(400).json({
            message: "Invalid email or password"
        });
        return;
    }

    try {
        const user = await UserModel.findOne({ email: createPayload.email });
        if (!user) {
            res.status(411).json({
                message: "Invalid email or password"
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(createPayload.password, user.password);
        if (!isPasswordValid) {
            res.status(411).json({
                message: "Invalid email or password"
            });
            return;
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }
}