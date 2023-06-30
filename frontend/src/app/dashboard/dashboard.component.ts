import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';

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
  
  ngOnInit() {
    this.selectedComponent = 'dashboard';
    this.fetchProjectData();
    this.fetchTaskData();
    this.fetchTeamData();
    this.fetchBarChart();
    this.fetchPieChart();
  }

  showComponent(component: string) {
    this.selectedComponent = component;
    if (component === 'dashboard') {
      window.location.reload();
    }
  }

  
  fetchProjectData() {
    this.http.get<any[]>('http://localhost:3000/projectList').subscribe(
      (projects: any[]) => {
        this.totalProjects = projects.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchTaskData() {
    this.http.get<any[]>('http://localhost:3000/taskList').subscribe(
      (tasks: any[]) => {
        this.totalTasks = tasks.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchTeamData() {
    this.http.get<any[]>('http://localhost:3000/teamList').subscribe(
      (teams: any[]) => {
        this.totalTeams = teams.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //Bar chart
  teamdata: any[] = [];

  fetchBarChart() {
    this.http.get<any[]>('http://localhost:3000/teamList').subscribe((teamdata: any[]) => {
      const chartData = teamdata.map(team => ({ name: team.teamName, y: team.totalMember }));
      this.renderChart(chartData);
    });
  }

  renderChart(chartData: any[]) {
    Highcharts.chart('team-chart-container', {
      chart: {
        type: 'column',
        width: 400,
        height: 250,
      },
      title: {
        text: 'Team Details'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Number of Members'
        }
      },
      series: [{
        type: 'column',
        name: 'Team Members',
        data: chartData
      }]
    });
  }

  //pie chart

  projectdata: any[] = [];
  
  fetchPieChart(){
    this.http.get<any[]>('http://localhost:3000/projectList').subscribe(
    (projectdata: any[]) => {
      const chartData = projectdata.map(project => ({
        name: project.projectName,
        y: this.calculateProjectDuration(project.startDate, project.endDate)
      }));

      this.renderPieChart(chartData);
    },
    (error) => {
      console.log(error);
    }
  );
  }

  calculateProjectDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return durationInDays;
  }

  renderPieChart(chartData: any[]) {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie',
        width: 400,
        height: 250,
      },
      title: {
        text: 'Project Duration(days)',
      },
      series: [{
        type: 'pie',
        name: 'Projects',
        data: chartData,
      }],
    };
  
    Highcharts.chart('project-chart-container', chartOptions);
  }
  
  
  
}
