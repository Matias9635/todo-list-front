import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskRepository } from "../../base/task-repository";
import { IUseCase } from "../../base/use-case";

@Injectable()
export class DeleteTaskUseCase implements IUseCase<number, Object> {
    constructor(private taskRepository: TaskRepository) {}

    execute(taskId: number): Observable<Object> {
        return this.taskRepository.deleteTask(taskId);
    }
}