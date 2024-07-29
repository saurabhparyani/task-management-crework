import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxLength: 100},
    description: {type: String, trim: true, maxLength: 500},
    status: {type: String, required: true, enum: ['To do', 'In Progress', 'Under Review', 'Finished']},
    priority: {type: String, enum: ['Low', 'Medium', 'Urgent']},
    deadline: {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true})

const TaskModel = mongoose.model("Task", TaskSchema)

export default TaskModel;