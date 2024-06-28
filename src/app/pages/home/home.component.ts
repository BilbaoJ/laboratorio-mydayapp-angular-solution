import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component'
import { FooterComponent } from '@shared/footer/footer.component'
import { Task } from 'src/app/models/task.model';
import { TaskService } from '@shared/services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, HeaderComponent, CommonModule  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  updateStatus(index: number){
    this.taskService.updateTaskStatus(index);
  }

  updateEditingMode(index: number){
    this.taskService.updateTaskEditingMode(index, true);
  }

  updateTitle(index:number, event:Event){
    const input = event.target as HTMLInputElement;
    this.taskService.updateTaskTitle(index, input.value)
  }

  deleteTask(index:number){
    this.taskService.deleteTask(index);
  }

}
