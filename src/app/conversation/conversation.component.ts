// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { HttpClient } from '@angular/common/http';

// // @Component({
// //   selector: 'app-conversation',
// //   templateUrl: './conversation.component.html',
// //   styleUrls: ['./conversation.component.css'],
// // })
// // export class ConversationComponent implements OnInit {
// //   senderName!: string;
// //   messages: any[] = [];

// //   constructor(private route: ActivatedRoute, private http: HttpClient) {}

// //   ngOnInit(): void {
// //     this.route.params.subscribe((params) => {
// //       this.senderName = params['senderName'];
// //       const chatId = params['chatId'];
// //       this.fetchMessages(chatId);
// //     });
// //   }

// //   fetchMessages(chatId: string) {
// //     this.http
// //       .get<any[]>(`http://localhost:8000/api/v1/message/${chatId}`)
// //       .subscribe(
// //         (response) => {
// //           console.log('API Response:', response);
// //           this.messages = response;
// //         },
// //         (error) => {
// //           console.error('Error fetching messages:', error);
// //         }
// //       );
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-conversation',
//   templateUrl: './conversation.component.html',
//   styleUrls: ['./conversation.component.css'],
// })
// export class ConversationComponent implements OnInit {
//   senderName!: string;
//   messages: any[] = [];
//   chatId: string = '';

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.senderName = params['senderName'];
//       this.chatId = params['chatId'];
//       this.fetchMessages(this.chatId);
//     });
//   }

//   fetchMessages(chatId: string) {
//     this.http
//       .get<any[]>(`http://localhost:8000/api/v1/message/${chatId}`)
//       .subscribe(
//         (response) => {
//           this.messages = response;
//         },
//         (error) => {
//           console.error('Error fetching messages:', error);
//         }
//       );
//   }

//   sendMessage(messageContent: string) {
//     const message = {
//       chat_id: this.chatId,
//       message: messageContent,
//     };
//     this.http
//       .post<any>('http://localhost:8000/api/v1/messages', message)
//       .subscribe(
//         (response) => {
//           console.log('Message sent successfully:', response);
//           // Assuming you want to refresh the messages after sending
//           this.fetchMessages(this.chatId);
//         },
//         (error) => {
//           console.error('Error sending message:', error);
//         }
//       );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  senderName!: string;
  messages: any[] = [];
  chatId: string = '';
  token: string = ''; // Initialize token variable

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get token from local storage
    this.token = localStorage.getItem('token') || '';

    this.route.params.subscribe((params) => {
      this.senderName = params['senderName'];
      this.chatId = params['chatId'];
      this.fetchMessages(this.chatId);
    });
  }

  fetchMessages(chatId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .get<any[]>(`http://localhost:8000/api/v1/message/${chatId}`, { headers })
      .subscribe(
        (response) => {
          this.messages = response;
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  sendMessage(messageContent: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const message = {
      chat_id: this.chatId,
      message: messageContent,
    };
    this.http
      .post<any>('http://localhost:8000/api/v1/messages', message, { headers })
      .subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          // Assuming you want to refresh the messages after sending
          this.fetchMessages(this.chatId);
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  }
}
