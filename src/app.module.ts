import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://blacklotus:usr@EEI1@cluster0.dsdmucq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), TodoModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
