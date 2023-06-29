import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { Router } from '@angular/router';

interface Task {
  _id: string;
  taskName: string;
  projectName: string;
  teamName: string;
  startDate: Date;
  endDate: Date;
  
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  constructor(private taskService: ProjectManagementService,private route: Router,private http: HttpClient) { }

  task: any = {}; // Empty task object to store form data
  tasks: any;   //contains all tasks

  TaskList: Task[] = [];
  selectedtaskId: Task | null = null;
  isContentVisible = false;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  isUpdateContentVisible = false;

  toggleUpdateContent(task: Task) {
    this.isUpdateContentVisible = !this.isUpdateContentVisible;
    this.selectedtaskId = task;
  }


 // fetch teams and projects from database
  teams: string[] = [];
  projects: string[] = [];


  ngOnInit() {
    this.fetchTeams();
    this.fetchProjects();
    this.getTasks();
  }

  fetchTeams() {
    this.http.get<any[]>('http://localhost:3000/teamList').subscribe(
      teams => {
        this.teams = teams.map(team => team.teamName);
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchProjects() {
    this.http.get<any[]>('http://localhost:3000/projectList').subscribe(
      projects => {
        this.projects = projects.map(project => project.projectName);
      },
      error => {
        console.log(error);
      }
    );
  }

 //get method

 getTasks() {
  this.taskService.getTaskLists().subscribe((tasks: any) => {
    this.tasks = tasks;
  });
}

//create

saveTask() {
  const { taskName, projectName, teamName, startDate, endDate } = this.task;
  this.taskService.createTaskList(taskName, projectName, teamName,startDate, endDate)
    .subscribe((response) => {
      console.log(response);
      alert("Task added successfully");
      this.task = {};
      this.getTasks();
      this.route.navigate(['/']);
      this.isContentVisible = false;
    });
}

onDeleteListClick(taskId: string) {
  this.taskService.deleteTaskList(taskId).subscribe(
    (res: any) => {
      console.log(res);
      this.taskService.getTaskLists().subscribe((tasks: Object) => {
        this.tasks = tasks;
      }); 
      alert("Task details deleted successfully");
    },
    (error: any) => {
      console.log(error);
    }
  );
} 

//update
 updateTask() {
  if (!this.selectedtaskId) {
    return;
  }

  const {_id, taskName, projectName, teamName, startDate, endDate } = this.selectedtaskId;
  const updatedTask = { taskName, projectName, teamName , startDate, endDate};

  this.http.patch(`http://localhost:3000/taskList/${_id}`, updatedTask).subscribe(
    (response) => {
      console.log(response);
      this.selectedtaskId = null;
      this.getTasks();
      alert("Updated successfully")
    },
    (error) => {
      console.log(error);
    }
  );
}

cancelUpdate() {
  this.isUpdateContentVisible = false;
  this.selectedtaskId = null;
  this.getTasks()
}



}
