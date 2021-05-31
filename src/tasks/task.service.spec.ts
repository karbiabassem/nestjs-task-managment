import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get.tasks.filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasRepository = () => ({
    getTasks: jest.fn(),
    findOne:jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn()
});

describe('TaskService', () => {
    let taskService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TasksService,
                { provide: TaskRepository, useFactory: mockTasRepository }
            ]
        }).compile();

        taskService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });
    describe('getTasks', () => {
        it('gets all tasks from the repository', async() => {
            taskRepository.getTasks.mockResolvedValue('someValue');
            
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' }
            const result= await taskService.getAllTasks(filters);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });
    describe('getTaskById',()=>{
     it('calls taskRepository.findOne() and succesffuly retrieve and return the task',async()=>{
       const mockTask={title:'Test task',description:'Test desc'};
       taskRepository.findOne.mockResolvedValue(mockTask);

       const result=await taskService.getTaskById(1);
       expect(result).toEqual(mockTask);

     });
     it('throws an error as task id not found',()=>{
         taskRepository.findOne.mockResolvedValue(null);
         expect(taskService.getTaskById(1)).rejects.toThrow(NotFoundException);
     })
    });
    
    describe('createTask',()=>{
        it('create task with mocked tasks',async ()=>{
            expect(taskRepository.createTask).not.toHaveBeenCalled();

            const taskResult={
                id: 2,
                title:'Test task',
                description:'Test desc',
                status: TaskStatus.DONE
            };
            taskRepository.createTask.mockResolvedValue(taskResult);
             const result = await taskService.createTask(taskResult);

            expect(taskRepository.createTask).toHaveBeenCalledWith(taskResult)
             expect(result).toEqual(result);
        });

    });

    describe('deleteTask',()=>{
       it('delete task with specefic id ',async ()=>{
           taskRepository.delete.mockResolvedValue(1);

           expect(taskRepository.delete).not.toHaveBeenCalled();
           await taskService.deleteTask(2);
           expect(taskRepository.delete).toHaveBeenCalled();

       })

       it('throw a not found exception ',async()=>{
        taskRepository.delete.mockResolvedValue(0);
        expect(taskService.deleteTask(1)).rejects.toThrow(NotFoundException);
       })
    });
})

