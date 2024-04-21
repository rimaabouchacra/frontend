// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-chats',
//   templateUrl: './chats.component.html',
//   styleUrls: ['./chats.component.css'],
// })
// export class ChatsComponent {
//   chats: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchChats();
//   }

//   fetchChats() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('Token not found in local storage');
//       return;
//     }

//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http
//       .get<any[]>('http://localhost:8000/api/v1/chats/last', { headers })
//       .subscribe(
//         (response) => {
//           this.chats = response;
//           console.log(response)
//         },
//         (error) => {
//           console.error('Error fetching chats:', error);
//         }
//       );
//   }
// }


import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  chats: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

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
          console.log(response);
        },
        (error) => {
          console.error('Error fetching chats:', error);
        }
      );
  }

  resetMessageCount(chat: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post<any>(
        'http://localhost:8000/api/v1/reset-message-count',
        { chatId: chat.id },
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Message count reset successfully:', response);
          // After resetting, navigate to the conversation component
          this.router.navigate([
            '/conversation',
            chat.id,
            { senderName: chat.sender_name },
          ]);
        },
        (error) => {
          console.error('Error resetting message count:', error);
        }
      );
  }
}
