import { Request, Response } from 'express';
import TaskModel from '../db/models/tasks';

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, priority, deadline } = req.body;
    try {
        const newTask = await TaskModel.create({
            title,
            description,
            status,
            priority,
            deadline,
            user: (req as any).userId,
        });
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { taskId  } = req.params;
    const updateData = req.body;
    try {
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: taskId , user: (req as any).userId },
            updateData,
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { taskId  } = req.params;
    try {
        const deletedTask = await TaskModel.findOneAndDelete({ _id: taskId , user: (req as any).userId });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find({ user: (req as any).userId });
        res.status(200).json({ tasks });
    } catch (e) {
        res.status(500).json({ message: 'Server error', error: (e as Error).message });
    }
};
