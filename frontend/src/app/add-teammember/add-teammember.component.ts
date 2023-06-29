import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../project-management.service';
import { HttpClient } from '@angular/common/http';

interface Teammember {
  _id: string;
  name: string;
  designation: string;
}

@Component({
  selector: 'app-add-teammember',
  templateUrl: './add-teammember.component.html',
  styleUrls: ['./add-teammember.component.scss']
})
export class AddTeammemberComponent {

  isContentVisible = false;

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  isUpdateContentVisible = false;

  toggleUpdateContent(teammember: Teammember) {
    this.isUpdateContentVisible = !this.isUpdateContentVisible;
    this.selectedteammemberId = teammember;
  }

  teammember: any = {}; // Empty team member object to store form data
  teammembers: any;   //contains all team member

  TeammemberList: Teammember[] = [];
  selectedteammemberId: Teammember | null = null;
  
  constructor(private teammemberService: ProjectManagementService,private route: Router,private http: HttpClient) { }

  ngOnInit() {
    this.getTeammembers();
  }

  getTeammembers() {
    this.teammemberService.getTeammemberLists().subscribe((teammembers: any) => {
      this.teammembers = teammembers;
    });
  }

  saveTeamMember() {
    const { name, designation } = this.teammember;
    this.teammemberService.createTeammemberList(name, designation)
      .subscribe((response) => {
        console.log(response);
        alert("Team member added successfully");
        this.teammember = {};
        this.getTeammembers();
        this.route.navigate(['/']);
        this.isContentVisible = false;
      });
  }

  onDeleteListClick(teammemberId: string) {
    this.teammemberService.deleteTeammemberList(teammemberId).subscribe(
      (res: any) => {
        console.log(res);
        this.teammemberService.getTeammemberLists().subscribe((teammembers: Object) => {
          this.teammembers = teammembers;
        }); 
        alert("Team member detail deleted successfully");
      },
      (error: any) => {
        console.log(error);
      }
    );
  } 

  //update
   updateTeammember() {
    if (!this.selectedteammemberId) {
      return;
    }

    const {_id, name, designation } = this.selectedteammemberId;
    const updatedTeammember = { name, designation };

    this.http.patch(`http://localhost:3000/teammemberList/${_id}`, updatedTeammember).subscribe(
      (response) => {
        console.log(response);
        this.selectedteammemberId = null;
        this.getTeammembers();
        alert("Updated successfully")
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelUpdate() {
    this.isUpdateContentVisible = false;
    this.selectedteammemberId = null;
    this.getTeammembers()
  }
}
