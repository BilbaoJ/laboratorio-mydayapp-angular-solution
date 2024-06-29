import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component'
import { FooterComponent } from '@shared/footer/footer.component'
import { Task } from 'src/app/models/task.model';
import { TaskService } from '@shared/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, HeaderComponent, CommonModule ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: string =''

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });

    this.route.url.subscribe(() => {
      this.applyFilter();
    });
  }

  updateStatus(index: number){
    this.taskService.updateTaskStatus(index);
  }

  updateEditingMode(index: number, editing: boolean){
    this.taskService.updateTaskEditingMode(index, editing);
  }

  updateTitle(index:number, event:Event){
    const input = event.target as HTMLInputElement;
    this.taskService.updateTaskTitle(index, input.value)
  }

  deleteTask(index:number){
    this.taskService.deleteTask(index);
  }

  applyFilter() {
    const url = this.route.snapshot.url.join('/');
    if (url === 'pending') {
      this.filter = 'pending'
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else if (url === 'completed') {
      this.filter = 'completed'
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else {
      this.filter = 'all'
      this.filteredTasks = this.tasks;
    }
  }
}
