import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get.tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDto):Promise<Task[]>{
        return this.tasksService.getAllTasks(filterDto);
    }

    @Get("/:id")
    getTaskById(@Param('id',ParseIntPipe) id: number):Promise<Task> { 
        const task =this.tasksService.getTaskById(id);
        return task;
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,

    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete("/:id")
    deleteTask(@Param('id',ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    // @Patch("/:id/status")
    // updateTask(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ) :Task {
    //     return this.tasksService.updateTaskById(id, status);
    // }

}
