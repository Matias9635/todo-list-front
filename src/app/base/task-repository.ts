import { Observable } from "rxjs";
import { TaskEntity } from "../entities/task";

export abstract class TaskRepository {
    abstract getTasks(): Observable<TaskEntity[]>;
    abstract createTask(task: TaskEntity): Observable<TaskEntity>;
    abstract updateTask(taskId: number, updates: Partial<TaskEntity>): Observable<Object>;
    abstract deleteTask(taskId: number): Observable<Object>;
}