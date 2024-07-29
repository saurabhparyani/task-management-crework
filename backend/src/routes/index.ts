import express, {Express, Request, Response} from 'express';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';

const mainRouter = express.Router();


mainRouter.use('/user', userRoutes);
mainRouter.use('/task', taskRoutes);

export default mainRouter;