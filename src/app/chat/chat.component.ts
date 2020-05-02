import { Component, OnInit } from '@angular/core';
import { FireauthService } from './../service/fireauth.service';
import { AlertService } from './../service/alert.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    public fireauthSrv: FireauthService,
    public alertSrv: AlertService) { }

  ngOnInit() {
  }

}
