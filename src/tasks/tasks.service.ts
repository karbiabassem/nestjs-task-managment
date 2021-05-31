import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get.tasks.filter.dto';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {
    }
    async getAllTasks(filterDto:GetTasksFilterDto) :Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with Id "${id}" not found`)
        }
        return found;
    }



    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);

    }

    async deleteTask(id: number): Promise<void> {

        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with Id "${id}" not found`)

        }
    }

    // updateTaskById(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = TaskStatus.IN_PROGRESS;
    //     return task;
    // }
}
