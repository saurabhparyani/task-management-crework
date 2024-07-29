import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();

const secretKey = process.env.JWT_SECRET as string;
export const generateToken = (userId: string) => {
    return jwt.sign({
        userId
    }, secretKey)
}
export const verifyToken = (token: string) => {
    return jwt.verify(token, secretKey)
}