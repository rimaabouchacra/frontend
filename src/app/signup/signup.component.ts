import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      name: this.username,
      email: this.email,
      password: this.password,
    };

    this.http
      .post('http://localhost:8000/api/v1/auth/signup', formData)
      .subscribe(
        (response) => {
          console.log('Signup successful:', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Signup failed:', error);
          if (error.status === 422 && error.error && error.error.message) {
            this.errorMessage = error.error.message;
            this.username = '';
            this.email = '';
            this.password = '';
          } else {
            this.errorMessage = 'Signup failed';
          }
        }
      );
  }
}
