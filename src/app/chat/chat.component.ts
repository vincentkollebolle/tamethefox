import { Component, OnInit } from '@angular/core';
import { FireauthService } from './../service/fireauth.service';
import { AlertService } from './../service/alert.service';
import { UserService } from '../service/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userList$;
  sunnyUsers$;
  cloudsUsers$;
  questionsUsers$;

  constructor(
    public fireauthSrv: FireauthService,
    public alertSrv: AlertService,
    public userSrv: UserService) { }

  ngOnInit() {
    this.userList$ = this.userSrv.getUsers();
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'sunny' ))).subscribe(value => this.sunnyUsers$ = value);
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'clouds' ))).subscribe(value => this.cloudsUsers$ = value);
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'questions' ))).subscribe(value => this.questionsUsers$ = value);

  }

}
