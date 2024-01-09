import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'
import { TaskEntity } from '../../../entities/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() task: TaskEntity;
  @Input() title: string;

  public taskForm: FormGroup;

  constructor(private readonly modalService: NgbActiveModal) {}

  ngOnInit(): void {
    this.task ? this.initEditForm() : this.initForm();
  }

  dismiss(): void {
    this.modalService.dismiss();
  }

  saveForm(): void {
    const { year, month, day } = this.taskForm.get('deadline')?.value;
    if (!(year | month | day)) return;

    let momentDate = moment();
    momentDate = momentDate.year(year);
    momentDate = momentDate.month(month - 1);
    momentDate = momentDate.date(day);

    const deadline = new Date(momentDate.format());
    this.modalService.close({
      id: this.task?.id,
      name: this.taskForm.get('name')?.value,
      deadline: deadline
    });
  }

  private initForm(): void {
    this.taskForm = new FormGroup({
      deadline: new FormControl(null, Validators.required)
    });
  }

  private initEditForm(): void {
    const year = moment(this.task.deadline.toString()).year();
    const month = moment(this.task.deadline.toString()).month() + 1;
    const day = moment(this.task.deadline.toString()).date();

    const currentDeadline = { day, month, year };

    this.taskForm = new FormGroup({
      name: new FormControl(this.task.name, Validators.required),
      deadline: new FormControl(currentDeadline, Validators.required)
    });
  }

}
