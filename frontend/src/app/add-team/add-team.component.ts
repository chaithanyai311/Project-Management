import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../project-management.service';
import { HttpClient } from '@angular/common/http';

interface Team {
  _id: string;
  teamName: string;
  totalMember: number;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent {

  constructor(private teamService: ProjectManagementService,private route: Router,private http: HttpClient) { }

  isContentVisible = false;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  isUpdateContentVisible = false;

  toggleUpdateContent(team: Team) {
    this.isUpdateContentVisible = !this.isUpdateContentVisible;
    this.selectedteamId = team;
  }

  team: any = {}; // Empty team object to store form data
  teams: any;   //contains all teams

  TeamList: Team[] = [];
  selectedteamId: Team | null = null;


  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeamLists().subscribe((teams: any) => {
      this.teams = teams;
    });
  }

  saveTeam() {
    const { teamName, totalMember, startDate, endDate } = this.team;
    this.teamService.createTeamList(teamName, totalMember, startDate, endDate)
      .subscribe((response) => {
        console.log(response);
        alert("Team added successfully");
        this.team = {};
        this.getTeams();
        this.route.navigate(['/']);
        this.isContentVisible = false;
      });
  }

  onDeleteListClick(teamId: string) {
    this.teamService.deleteTeamList(teamId).subscribe(
      (res: any) => {
        console.log(res);
        this.teamService.getTeamLists().subscribe((teams: Object) => {
          this.teams = teams;
        }); 
        alert("Team member detail deleted successfully");
      },
      (error: any) => {
        console.log(error);
      }
    );
  } 

  //update
   updateTeam() {
    if (!this.selectedteamId) {
      return;
    }

    const {_id, teamName, totalMember, startDate, endDate } = this.selectedteamId;
    const updatedTeam = { teamName, totalMember, startDate, endDate };

    this.http.patch(`http://localhost:3000/teamList/${_id}`, updatedTeam).subscribe(
      (response) => {
        console.log(response);
        this.selectedteamId = null;
        this.getTeams();
        alert("Updated successfully")
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelUpdate() {
    this.isUpdateContentVisible = false;
    this.selectedteamId = null;
    this.getTeams()
  }
}
