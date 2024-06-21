import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createDate: Date;
  completedDate?: Date;
}

@Injectable({})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Complete TypeScript tutorial',
      description: 'Finish the TypeScript tutorial series on YouTube.',
      completed: false,
      createDate: new Date('2024-06-21'),
      completedDate: undefined,
    },
    {
      id: 2,
      title: 'Write blog post about TypeScript features',
      description:
        'Create an in-depth blog post about advanced TypeScript features.',
      completed: true,
      createDate: new Date('2024-06-20'),
      completedDate: new Date('2024-06-20'),
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: any): Task {
    console.log(this.tasks.find((task) => task.id === id));
    
    return this.tasks.find((task) => task.id === parseInt(id));
  }

  create(taskDto: TaskDto): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      ...taskDto,
      completed: false,
      createDate: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: any, taskDto: TaskDto): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      return null;
    }
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskDto,
    };
    return this.tasks[taskIndex];
  }

  delete(id: any): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      return null;
    }
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }
}
