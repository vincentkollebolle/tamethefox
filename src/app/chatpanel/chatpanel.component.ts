import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatService } from '../service/chat.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit {

  msg2send ;  //the message to send (ngModel)

  // The user we want to chat to
  @Input('from') from;
  @Input('to') to;
  hideChatpanel = false;

  public index: number;

  //In order to be abble to be closed, a subject
  close = new Subject<boolean>();

  chatMessages;
  profilEntry2send;
  profileEntries;
  
  constructor(
    private chatSrv: ChatService,
    private profileSrv: ProfileService
  ) { }

  ngOnInit() {
    //get chat messages
    this.chatSrv.getEntries().subscribe(data => {
      this.chatMessages = data.map(message => {
        return {
          createdAt: message.createdAt.toDate(),
          from: message.from,
          mood: message.mood,
          to: message.to,
          content: message.content
        };
      })
    });
    //get profile messages
    this.profileSrv.getEntries(this.to).subscribe(data => {
      this.profileEntries = data.map(e => {
        return {
          createdAt: e.createdAt.toDate(),
          from: e.from,
          fromTimestamp: e.fromTimestamp,
          to: e.to,
          content: e.content
        };
      })
    });
  }

  sendMessage(){
    this.chatSrv.addEntry(this.from, this.to, this.msg2send);
    this.msg2send = null;
  }

  addEntryToProfile() {
    this.profileSrv.addEntry(this.from, this.to, this.profilEntry2send);
    this.profilEntry2send = null;
  }

  destroy() {
    this.close.next();
  }

}
