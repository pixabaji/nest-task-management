import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title: title,
      desc: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }

    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);

    const taskIdx = this.tasks.findIndex(task => task.id === found.id);
    this.tasks.splice(taskIdx, 1);
  }

  updateStatus(id: string, status: TaskStatus) {
    const idx = this.tasks.findIndex( task => task.id === id);
    this.tasks[idx].status = status;
    return this.tasks[idx];
  }

  getTaskByFilter(taskFilterDto: GetTaskFilterDto): Task[] {
    const { status, search } = taskFilterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = this.tasks.filter((i) => i.status === status);
      console.log(status, tasks);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.desc.includes(search)) {
          return true;
        }

        return false;
      });
    }
    console.log(tasks);
    return tasks;
  }
}
