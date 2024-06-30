import { Component, OnInit } from '@angular/core';
import { TaskService } from '@shared/services/task.service';
import { Observable } from 'rxjs';
import { Task } from '@shared/models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true
})
export class HeaderComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  newTaskCtrl = new FormControl('', {
    nonNullable:true,
    validators: [
      Validators.required,
    ]
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(){
    this.tasks$ = this.taskService.getTasks();
  }

  newTaskHandler(){
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string){
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.taskService.addTask(newTask);
  }

}
