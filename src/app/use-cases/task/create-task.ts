import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskRepository } from "../../base/task-repository";
import { IUseCase } from "../../base/use-case";
import { TaskEntity } from "../../entities/task";

@Injectable()
export class CreateTaskUseCase implements IUseCase<TaskEntity, TaskEntity> {
    constructor(private taskRepository: TaskRepository) {}

    execute(task: TaskEntity): Observable<TaskEntity> {
        return this.taskRepository.createTask(task);
    }
}