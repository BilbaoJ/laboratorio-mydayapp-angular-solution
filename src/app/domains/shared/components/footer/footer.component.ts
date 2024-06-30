import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '@shared/services/task.service';
import { Task } from '@shared/models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-footer',
  imports: [ CommonModule, RouterLink ],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  @Input() filter = '';
  tasks: Task[] = [];
  pendingTasks!: number;
  completedTasks!: number;

  constructor(private taskService: TaskService) {}

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updatePendingTasks();
      this.updateCompletedTasks();
    });
  }

  updatePendingTasks(){
    this.pendingTasks = this.taskService.getPendingTasks();
  }

  updateCompletedTasks(){
    this.completedTasks = this.taskService.getCompletedTasks();
  }

  wordItem(){
    return this.pendingTasks === 1 ? 'item' : 'items';
  }

  deleteAllCompleted(){
    this.taskService.deleteAllCompleted();
  }
}
