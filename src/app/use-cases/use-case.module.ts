import { NgModule } from '@angular/core';
import { TaskRepository } from '../base/task-repository';
import { DataModule } from '../data/data/data.module';
import { CreateTaskUseCase } from './task/create-task';
import { DeleteTaskUseCase } from './task/delete-task';
import { GetTasksUseCase } from './task/get-tasks';
import { UpdateTaskUseCase } from './task/update-task';



@NgModule({
  providers: [
    {provide: GetTasksUseCase, deps: [TaskRepository]},
    {provide: CreateTaskUseCase, deps: [TaskRepository]},
    {provide: UpdateTaskUseCase, deps: [TaskRepository]},
    {provide: DeleteTaskUseCase, deps: [TaskRepository]},
  ],
  imports: [
    DataModule
  ]
})
export class UseCaseModule { }
