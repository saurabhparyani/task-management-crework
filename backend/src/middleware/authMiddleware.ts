import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import UserModel from '../db/models/users';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))  
        {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        console.log('Decoded Token:', decoded);
        const { userId } = decoded as any;
        console.log('User ID from Token:', userId);
        const user = await UserModel.findById(userId)
        console.log(user?._id);
        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }
        (req as any).userId = user._id;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
