import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private storageKey = 'mydayapp-angular';
  private tasksSubject: BehaviorSubject<Task[]>;

  constructor() {
    const storage = localStorage.getItem(this.storageKey);
    const initialTasks = storage ? JSON.parse(storage) : [];
    this.tasksSubject = new BehaviorSubject<Task[]>(initialTasks);

    this.tasksSubject.subscribe(tasks => {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    });
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, task];
    this.tasksSubject.next(updatedTasks);
  }
}
