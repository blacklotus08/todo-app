import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    priority: { type: Number, required: true },
    status: { type: String, required: true }
});

export class Todo extends mongoose.Document {
    id: string;
    task_name: string;
    description: string;
    due_date: Date;
    priority: number;
    status: string;
}