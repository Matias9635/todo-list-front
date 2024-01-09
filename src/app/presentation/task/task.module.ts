import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingModule } from './task-routing.module';
import { UseCaseModule } from '../../use-cases/use-case.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    UseCaseModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
