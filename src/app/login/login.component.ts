import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post('http://localhost:8000/api/v1/auth/login', formData)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.email = '';
          this.password = '';
          this.errorMessage = '';
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'Login failed';
          }
        }
      );
  }
}
