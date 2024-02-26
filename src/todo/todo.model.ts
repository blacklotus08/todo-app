import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    taskName: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: Number},
    status: { type: String }
});

export class Todo extends mongoose.Document {
    id: string;
    taskName: string;
    description: string;
    dueDate: Date;
    priority: number;
    status: string;
}