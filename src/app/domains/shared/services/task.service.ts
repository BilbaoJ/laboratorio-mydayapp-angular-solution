import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '@shared/models/task.model';

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

  updateTaskStatus(index: number) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.tasksSubject.next(updatedTasks);
  }

  updateTaskEditingMode(index: number, editing: boolean) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map((task, i) => {
      return {
        ...task,
        editing: i === index ? editing : false
      };
    });
    this.tasksSubject.next(updatedTasks);
  }

  updateTaskTitle(index: number, newTitle: string) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          title: newTitle,
          editing: false
        };
      }
      return task;
    });
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(index: number){
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.filter((task, i)=> i !== index);
    this.tasksSubject.next(updatedTasks);
  }

  getPendingTasks() {
    return this.tasksSubject.value.filter(task => !task.completed).length;
  }

  deleteAllCompleted(){
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.filter((task, i) => task.completed === false);
    this.tasksSubject.next(updatedTasks);
  }

  getCompletedTasks() {
    return this.tasksSubject.value.filter(task => task.completed).length;
  }

}
