import { Component, OnInit,Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit {

  connectedUser;
  selectedBox = "profilebox";
  chatMessages; // chatmessages on the server
  msg2send ;  //the message to send (ngModel)
  profilEntry2send;
  profileEntries;

  // The user we want to chat to
  @Input('from') from;
  @Input('to') to;
  hideChatpanel = false;

  public index: number;

  //In order to be abble to be closed, a subject
  close = new Subject<boolean>();

  constructor(
    private chatSrv: ChatService,
    private profileSrv: ProfileService,
    private userSrv: UserService) { }

  ngOnInit() {
    //getConnectedUser
    this.connectedUser = this.userSrv.getConnectedUser();
    //get message of ConnectedUser

    this.chatSrv.getEntries(this.from, this.to).subscribe(data => {
      this.chatMessages = data.map(e => {
        return {
          createdAt: e.createdAt.toDate(),
          from: e.from,
          fromTimestamp: e.fromTimestamp,
          mood: e.mood,
          to: e.to,
          content: e.content
        };
      })
    });

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

  selectBox(boxname) {
    this.selectedBox = boxname;
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
