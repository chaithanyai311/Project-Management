import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddTeammemberComponent } from './add-teammember/add-teammember.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddProjectComponent,
    AddTeamComponent,
    AddTaskComponent,
    AddTeammemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
