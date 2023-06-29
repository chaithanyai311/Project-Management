import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private http: HttpClient) { }

  totalTeams: number = 0;
  teams: any[] = [];

  totalProjects: number = 0;
  projects: any[] = [];

  totalTasks: number = 0;
  tasks: any[] = [];

  activeTab: string = 'dashboard';
  selectedComponent: string = '';
  isTotalProjectVisible: boolean = false;
  isTotalTaskVisible: boolean = false;
  isTotalTeamVisible: boolean = false;
  isProductivityVisible: boolean = false;
  isBarChartVisible: boolean = false;
  isPieChartVisible: boolean = false;
  
  ngOnInit() {
    this.selectedComponent = 'dashboard';
  }

  showComponent(component: string) {
    this.selectedComponent = component;
  }

  showTotalProjectPopup() {
    this.http.get<any[]>('http://localhost:3000/projectList').subscribe(
      (projects: any[]) => {
        this.projects = projects;
        this.totalProjects = projects.length;
        this.isTotalProjectVisible = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showTotalTaskPopup() {
    this.http.get<any[]>('http://localhost:3000/taskList').subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
        this.totalTasks = tasks.length;
        this.isTotalTaskVisible = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showTotalTeamPopup() {
    this.http.get<any[]>('http://localhost:3000/teamList').subscribe(
      (teams: any[]) => {
        this.teams = teams;
        this.totalTeams = teams.length;
        this.isTotalTeamVisible = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showProductivityPopup() {
    this.isProductivityVisible = true;
  }

  showBarChartPopup() {
    this.isBarChartVisible = true;
  }

  showPieChartPopup() {
    this.isPieChartVisible = true;
  }

  closePopup() {
    this.isTotalProjectVisible = false;
    this.isTotalTaskVisible = false;
    this.isTotalTeamVisible = false;
    this.isProductivityVisible = false;
    this.isBarChartVisible = false;
    this.isPieChartVisible = false;
  }
}
