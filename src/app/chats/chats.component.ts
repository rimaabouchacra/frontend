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
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<any[]>('http://localhost:8000/api/v1/chats/last', { headers })
      .subscribe(
        (response) => {
          this.chats = response;
          console.log(response)
        },
        (error) => {
          console.error('Error fetching chats:', error);
        }
      );
  }
}
