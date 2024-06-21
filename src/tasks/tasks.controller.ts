import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): any {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): any {
    return this.tasksService.findById(id);
  }

  @Post()
  create(@Body() taskDto: TaskDto): any {
    return this.tasksService.create(taskDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() taskDto: TaskDto): any {
    return this.tasksService.update(id, taskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): any {
    return this.tasksService.delete(id);
  }
}
