import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component'
import { FooterComponent } from '@shared/footer/footer.component'
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';
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

}
