import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../project-management.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private apiService: ProjectManagementService,private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = ''; // Reset the error message

    if (this.signupForm.invalid) {
      alert('Username and password are required');
      return;
    }

    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;

    this.apiService.register(username, password).subscribe(
      (response) => {
        console.log(username);
        console.log(password);
        alert('Successfully Registered');
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Username already exists. Please choose a different username.';
          alert('Username already exists. Please choose a different username');
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
