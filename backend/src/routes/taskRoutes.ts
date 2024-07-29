import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);

export default taskRouter;
