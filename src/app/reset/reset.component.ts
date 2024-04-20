import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-email',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  email: string = '';
  error: string | null = null;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  sendEmail() {
    this.loading = true;
    this.http
      .post<any>('http://localhost:8000/api/v1/auth/password/email', {
        email: this.email,
      })
      .subscribe(
        () => {
          this.loading = false;
          // Redirect to login page or show success message
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.error = error.error || 'Email is invalid';
        }
      );
  }

  handleEmailChange() {
    this.error = null; // Clear error when email is changed
  }
}
