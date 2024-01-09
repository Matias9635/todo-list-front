import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskRepository } from "../../base/task-repository";
import { IUseCase } from "../../base/use-case";
import { TaskEntity } from "../../entities/task";

@Injectable()
export class GetTasksUseCase implements IUseCase<void, TaskEntity[]> {
    constructor(private taskRepository: TaskRepository) {}

    execute(): Observable<TaskEntity[]> {
        return this.taskRepository.getTasks();
    }
}