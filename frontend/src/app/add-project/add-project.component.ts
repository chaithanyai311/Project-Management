import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { Router } from '@angular/router';

interface Project {
  _id: string;
  projectName: string;
  startDate: Date;
  endDate: Date;
  teamName: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  constructor(private projectService: ProjectManagementService,private route: Router,private http: HttpClient) { }
  isContentVisible = false;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  isUpdateContentVisible = false;

  toggleUpdateContent(project: Project) {
    this.isUpdateContentVisible = !this.isUpdateContentVisible;
    this.selectedprojectId = project;
  }

  project: any = {}; // Empty project object to store form data
  projects: any;   //contains all projects

  ProjectList: Project[] = [];
  selectedprojectId: Project | null = null;

  // to get team name from database
  teams: string[] = [];

  ngOnInit() {
    this.fetchTeams();
    this.getProjects();
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

  //get method

  getProjects() {
    this.projectService.getProjectLists().subscribe((projects: any) => {
      this.projects = projects;
    });
  }

  //create

  saveProject() {
    const { projectName, startDate, endDate, teamName } = this.project;
    this.projectService.createProjectList(projectName,startDate, endDate, teamName)
      .subscribe((response) => {
        console.log(response);
        alert("Project added successfully");
        this.project = {};
        this.getProjects();
        this.route.navigate(['/']);
        this.isContentVisible = false;
      });
  }

  onDeleteListClick(projectId: string) {
    this.projectService.deleteProjectList(projectId).subscribe(
      (res: any) => {
        console.log(res);
        this.projectService.getProjectLists().subscribe((projects: Object) => {
          this.projects = projects;
        }); 
        alert("Project details deleted successfully");
      },
      (error: any) => {
        console.log(error);
      }
    );
  } 

  //update
   updateProject() {
    if (!this.selectedprojectId) {
      return;
    }

    const {_id, projectName, startDate, endDate, teamName } = this.selectedprojectId;
    const updatedProject = { projectName, startDate, endDate, teamName };

    this.http.patch(`http://localhost:3000/projectList/${_id}`, updatedProject).subscribe(
      (response) => {
        console.log(response);
        this.selectedprojectId = null;
        this.getProjects();
        alert("Updated successfully")
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelUpdate() {
    this.isUpdateContentVisible = false;
    this.selectedprojectId = null;
    this.getProjects()
  }

}
