import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  chats: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChats();
  }

  fetchChats() {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    // Include token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the HTTP request with the authorization token
    this.http
      .get<any[]>('http://localhost:8000/api/v1/chats', { headers })
      .subscribe(
        (response) => {
          this.chats = response;
        },
        (error) => {
          console.error('Error fetching chats:', error);
        }
      );
  }
}
