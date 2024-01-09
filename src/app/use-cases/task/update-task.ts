import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskRepository } from "../../base/task-repository";
import { IUseCase } from "../../base/use-case";
import { TaskEntity } from "../../entities/task";

@Injectable()
export class UpdateTaskUseCase implements IUseCase<Partial<TaskEntity>, Object> {
    constructor(private taskRepository: TaskRepository) {}

    execute(task: Partial<TaskEntity>): Observable<Object> {
        if (!task.id) throw new Error('Task id must be specified.');
        return this.taskRepository.updateTask(task.id, task);
    }
}