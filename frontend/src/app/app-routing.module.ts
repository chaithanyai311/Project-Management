import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddTeammemberComponent } from './add-teammember/add-teammember.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-teammember', component: AddTeammemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
