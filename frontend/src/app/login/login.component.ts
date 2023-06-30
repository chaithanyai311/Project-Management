import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../project-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string='';

  constructor(private formBuilder: FormBuilder, private authService: ProjectManagementService,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Username and password are required');
      return;
    }

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(username, password)
      .subscribe(
        response => {
          console.log(username);
          console.log(password);
          alert('Login successful');
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.errorMessage = error.message;
          alert('Invalid username or password');
        }
      );
  }
}
