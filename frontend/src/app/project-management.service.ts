import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {

  readonly ROOT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: any) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: any) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

  /*****************     Team member services  **********************************************/

  createTeammemberList(name: string, designation: string) {
    const teammemberData = { name, designation };
    return this.post('teammemberList', teammemberData);
  }

  getTeammemberLists() {
    return this.get('teammemberList');
  }

  deleteTeammemberList(id: string) {
    return this.delete(`teammemberList/${id}`);
  }

  
   /****************     Team services   *******************************************************/

  createTeamList(teamName: string, totalMember: number, startDate: Date, endDate: Date) {
    const teamData = { teamName, totalMember, startDate, endDate };
    return this.post('teamList', teamData);
  }

  getTeamLists() {
    return this.get('teamList');
  }

  deleteTeamList(id: string) {
    return this.delete(`teamList/${id}`);
  }

/****************     Project   *******************************************************/

  createProjectList(projectName: string, startDate: Date, endDate: Date, teamName: string) {
    const projectData = { projectName, startDate, endDate, teamName };
    return this.post('projectList', projectData);
  }

  getProjectLists() {
    return this.get('projectList');
  }

  deleteProjectList(id: string) {
    return this.delete(`projectList/${id}`);
  }


  /****************     Task   *******************************************************/
  
  createTaskList(taskName: string, projectName: string, teamName: string, startDate: Date, endDate: Date) {
    const taskData = { taskName, projectName, teamName, startDate, endDate };
    return this.post('taskList', taskData);
  }

  getTaskLists() {
    return this.get('taskList');
  }

  deleteTaskList(id: string) {
    return this.delete(`taskList/${id}`);
  }

}
