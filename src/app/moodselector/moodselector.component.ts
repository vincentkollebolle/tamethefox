import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './../user';
@Component({
  selector: 'app-moodselector',
  templateUrl: './moodselector.component.html',
  styleUrls: ['./moodselector.component.scss']
})
export class MoodselectorComponent implements OnInit {
  mood: string = 'sunny';
  thanksTabActive = false;
  moodSelectorTabActive = true;
  userList;
  connectedUser;
  constructor(private usrSrv: UserService) { }

  ngOnInit() {
    //get ConnectedUser
    this.connectedUser = this.usrSrv.getConnectedUser();
    //get users
    this.usrSrv.getUsers().subscribe(data => {
      this.userList = data.map(e => {
        return {
          timestamp: e.timestamp.toDate(),
          mood: e.mood,
          email: e.email
        } as User;
      })
    });
  }

  changeActualMood(mood: string) {
    if(mood == 'sunny') {
      this.thanksTabActive = true;
      this.moodSelectorTabActive = false;
    }
    this.mood = mood;
  }

  changeMood() {
    this.thanksTabActive = false;
    this.moodSelectorTabActive = true;
  }

}
