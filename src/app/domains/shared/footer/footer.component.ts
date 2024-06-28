import { Component, OnInit } from '@angular/core';
import { TaskService } from '@shared/services/task.service';
import { Task } from 'src/app/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [ CommonModule ],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
