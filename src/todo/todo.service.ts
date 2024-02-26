import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<Todo>,
    ) {}

    async getTodos() {
        const todos = await this.todoModel.find().exec();
        return todos.map(item => ({
          id: item.id,
          taskName: item.taskName,
          description: item.description,
          dueDate: item.dueDate,
          priority: item.priority,
          status: item.status

        }));
    }

    async getTodo(todoId: string) {
        const item = await this.findTodo(todoId);
        return {
          id: item.id,
          taskName: item.taskName,
          description: item.description,
          dueDate: item.dueDate,
          priority: item.priority,
          status: item.status
        };
    }

    async insertTodo(taskName: string, description: string, dueDate: Date, priority: number, status: string ) {
        const newTodo = new this.todoModel({
            taskName,
            description,
            dueDate,
            priority,
            status
        });
        const result = await newTodo.save();
        return result.id as string;
    }

    async updateTodo(id: string, taskName: string, description: string, dueDate: Date, priority: number, status: string) {
        const updatedTodo = await this.findTodo(id);
        if (taskName) {
            updatedTodo.taskName = taskName;
        }
        if (description) {
            updatedTodo.description = description;
        }
        if (dueDate) {
            updatedTodo.dueDate = dueDate;
        }
        if (priority) {
            updatedTodo.priority = priority;
        }
        if (status) {
            updatedTodo.status = status;
        }
        updatedTodo.save();
      }

    async deleteTodo(todoId: string) {
        const result = await this.todoModel.deleteOne({_id: todoId}).exec();
        if (result.deletedCount === 0) {
          throw new NotFoundException('Could not find record.');
        }
    }

    private async findTodo(id: string): Promise<Todo> {
        let todo;
        try {
            todo = await this.todoModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find record.');
        }
        if (!todo) {
          throw new NotFoundException('Could not find record.');
        }
        return todo;
      }
}
