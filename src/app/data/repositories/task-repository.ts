import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { TaskRepository } from "../../base/task-repository";
import { TaskEntity } from "../../entities/task";

@Injectable({
    providedIn: 'root',
})

export class TaskRepositoryImpl extends TaskRepository {
    constructor(private readonly http: HttpClient) {
        super();
    }

    getTasks(): Observable<TaskEntity[]> {
        return this.http.get<TaskEntity[]>(`${environment.apiUrl}/tasks`);
    }

    createTask(task: TaskEntity): Observable<TaskEntity> {
        return this.http.post<TaskEntity>(`${environment.apiUrl}/tasks`, task);
    }

    updateTask(taskId: number, updates: Partial<TaskEntity>): Observable<Object> {
        return this.http.put(`${environment.apiUrl}/tasks/${taskId}`, updates);
    }

    deleteTask(taskId: number): Observable<Object> {
        return this.http.delete(`${environment.apiUrl}/tasks/${taskId}`);
    }
}