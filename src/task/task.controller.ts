import { UpdateTaskStatusDto } from './DTO/update-task-status.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() taskFilterDto: GetTaskFilterDto): Task[] {
    console.log(taskFilterDto);
    if (Object.keys(taskFilterDto).length > 0) {
      return this.taskService.getTaskByFilter(taskFilterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this.taskService.updateStatus(id, updateTaskStatusDto.status);
  }
}
