import { NgModule } from '@angular/core';
import { TaskRepository } from '../../base/task-repository';
import { TaskRepositoryImpl } from '../repositories/task-repository';



@NgModule({
  providers: [
    {provide: TaskRepository, useClass: TaskRepositoryImpl}
  ]
})
export class DataModule { }
