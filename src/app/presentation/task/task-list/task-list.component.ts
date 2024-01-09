import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskEntity } from '../../../entities/task';
import { GetTasksUseCase } from '../../../use-cases/task/get-tasks';
import { CreateTaskUseCase } from '../../../use-cases/task/create-task';
import { UpdateTaskUseCase } from '../../../use-cases/task/update-task';
import { lastValueFrom } from 'rxjs';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteTaskUseCase } from '../../../use-cases/task/delete-task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  public tasks: TaskEntity[] = [];
  public newTaskName: string = '';
  public newTaskDeadlineDate: string | null = null;

  constructor(
    private readonly getTaskUseCase: GetTasksUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getTaskUseCase.execute().subscribe((tasks: TaskEntity[]) => {
      this.tasks = tasks;
    });
  }

  openNewTaskModal() {
    const modalRef = this.modalService.open(TaskFormComponent, { centered: true });

    modalRef.componentInstance.title = 'Create task';

    modalRef.result.then(
        (result) => {
          if (result && result.deadline) {
            this.saveNewTask(result.deadline);
          } else {
            this.modalService.dismissAll();
          }
        },
        (result) => {
          this.modalService.dismissAll();
        }
      );
  }

  openEditTaskModal(task: TaskEntity) {
    const modalRef = this.modalService.open(TaskFormComponent, {centered: true, size: 'lg'});

    modalRef.componentInstance.task = task;
    modalRef.componentInstance.title = 'Edit task';

    modalRef.result.then(
      (result) => {
        if (result) {
          const refresh = true;
          this.updateTask(result, refresh);
        }
      },
      () => {
        this.modalService.dismissAll();
      });
  }

  changeName(event: Event) {
    if((event.target as HTMLInputElement) && (event.target as HTMLInputElement).value !== null) {
      this.newTaskName = (event.target as HTMLInputElement).value;
    }
  }

  markAsCompleted(event: Event, task: TaskEntity) {
    task.completed = (event.target as HTMLInputElement).checked;
    this.updateTask(task);
  }

  openDeleteModal(modal: TemplateRef<any>, taskId: number) {
    const modalRef = this.modalService.open(modal, {centered: true});
    modalRef.result.then((result) => {
      if (result) {
        this.deleteTask(taskId);
      }
    })
  }

  private getTasks(): void {
    this.getTaskUseCase.execute().subscribe((tasks: TaskEntity[]) => {
      this.tasks = tasks;
    });
  }

  private saveNewTask(deadline: Date): void {
    const newTask = new TaskEntity();
    newTask.name = this.newTaskName;
    newTask.completed = false;
    newTask.deadline = deadline;

    this.createTaskUseCase.execute(newTask).subscribe(() => {
      this.getTasks();
      this.newTaskName = '';
    });
  }

  private updateTask(task: Partial<TaskEntity>, refresh = false): void {
    lastValueFrom(this.updateTaskUseCase.execute(task)).then(() => {
      if (refresh) this.getTasks();
    });
  }

  private deleteTask(taskId: number): void {
    this.deleteTaskUseCase.execute(taskId)
      .subscribe(() => {
        this.getTasks();
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getTasks();
      });
  }
}
