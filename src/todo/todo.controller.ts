import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Res,
    HttpStatus,
  } from '@nestjs/common';

  import { TodoService } from './todo.service';


@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async getAllTodos() {
      const todos = await this.todoService.getTodos();
      return todos;
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
      return this.todoService.getTodo(id);
    }

    @Post()
    async addTodo(
      @Body('taskName') taskName: string,
      @Body('description') description: string,
      @Body('dueDate') dueDate: Date,
      @Body('priority') priority: number,
      @Body('status') status: string,
    ) {
      const generatedId = await this.todoService.insertTodo(
        taskName,
        description,
        dueDate,
        priority,
        status
      );
      return { id: generatedId };
    }

    @Patch(':id')
    async updateTodo(
      @Param('id') id: string,
      @Body('taskName') taskName: string,
      @Body('description') description: string,
      @Body('dueDate') dueDate: Date,
      @Body('priority') priority: number,
      @Body('status') status: string,
    ) {
      await this.todoService.updateTodo(id, taskName, description, dueDate, priority, status );
      return null;
    }
  
    @Delete(':id')
    async removeTodo(@Param('id') todoId: string) {
        await this.todoService.deleteTodo(todoId);
        return null;
    }
}
