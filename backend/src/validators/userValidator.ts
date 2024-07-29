import { z } from 'zod';

export const signupSchema = z.object({
    fullName: z.string().max(50, { message: "Full name cannot exceed 50 characters" }),
    email: z.string().email( { message:"Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long"})
});

export const loginSchema = z.object({
    email: z.string().email({ message:"Invalid email address"}),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});
