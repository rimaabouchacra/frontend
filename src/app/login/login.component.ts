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
      .post<any>('http://localhost:8000/api/v1/auth/login', formData)
      .subscribe(
        (response) => {
          console.log('Login response:', response);
          if (
            response &&
            response.authorisation &&
            response.authorisation.token
          ) {
            // Save token to local storage
            localStorage.setItem('token', response.authorisation.token);
            window.location.href = '/chat';
            // Clear input fields and error message
            this.email = '';
            this.password = '';
            this.errorMessage = '';
          } else {
            console.error('Token not found in login response');
          }
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
