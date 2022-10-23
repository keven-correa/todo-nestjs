import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo> 
  ){}
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto);
    this.todoRepository.save(newTodo);
    return await newTodo;
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneBy({id: id});
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
      await this.todoRepository.update({id}, updateTodoDto);
      return await this.findOne(id);
  }

  async remove(id: number) {
    const todoExists = this.findOne(id);
    if(!todoExists) throw new NotFoundException();

    await this.todoRepository.delete(id);
    return HttpStatus.OK;
  }
}
