import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const result = service.findAll();
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', () => {
      const taskId = 1; // Assuming '1' exists in the mock data
      const result = service.findById(taskId);
      expect(result).toBeDefined();
      expect(result.id).toEqual(taskId);
    });

    it('should return undefined for non-existent ID', () => {
      const taskId = 999; // Assuming '999' does not exist in the mock data
      const result = service.findById(taskId);
      expect(result).toBeUndefined();
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const newTask: TaskDto = {
        id: 3,
        title: 'New Task',
        description: 'Description of the new task',
        completed: false,
        createDate: new Date(),
      };
      const result = service.create(newTask);
      expect(result).toEqual(newTask);
      expect(service.findById(3)).toEqual(newTask); // Verify task was added
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const taskId = '1'; // Assuming '1' exists in the mock data
      const updatedTask: TaskDto = {
        id: taskId,
        title: 'Updated Task',
        description: 'Updated description',
        completed: true,
        createDate: new Date(),
        completedDate: new Date(),
      };
      const result = service.update(taskId, updatedTask);
      expect(result).toEqual(updatedTask);
    });

    it('should return null for updating non-existent ID', () => {
      const taskId = '999'; // Assuming '999' does not exist in the mock data
      const updatedTask: TaskDto = {
        id: taskId,
        title: 'Updated Task',
        description: 'Updated description',
        completed: true,
        createDate: new Date(),
        completedDate: new Date(),
      };
      const result = service.update(taskId, updatedTask);
      expect(result).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID', () => {
      const taskId = 1; // Assuming '1' exists in the mock data
      const result = service.delete(taskId);
      expect(result).toBeDefined();
      expect(result.id).toEqual(taskId);
      expect(service.findById(taskId)).toBeUndefined(); // Verify task was deleted
    });

    it('should return null for deleting non-existent ID', () => {
      const taskId = '999'; // Assuming '999' does not exist in the mock data
      const result = service.delete(taskId);
      expect(result).toBeNull();
    });
  });
});
