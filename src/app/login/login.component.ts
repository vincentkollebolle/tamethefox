import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  moods: Array < string > = ["sunny", "clouds", "questions"];
  moodField: string;
  emailField;

  constructor(private userSrv: UserService) { }

  ngOnInit() {
  }

  validateForm(){
    // ask userSrv to connect with this email and update mood and timestamp
    // or ask userSrv to create user if no email.
    this.userSrv.connectOrCreateUser(this.emailField, this.moodField);

  }

}
