// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-conversation',
//   templateUrl: './conversation.component.html',
//   styleUrls: ['./conversation.component.css']
// })
// export class ConversationComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  chatId!: string;
  senderName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.chatId = params['chatId'];
      this.senderName = params['senderName'];
    });
  }
}
