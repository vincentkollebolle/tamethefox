import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.scss']
})
export class ChatpanelComponent implements OnInit {

  // The user we want to chat to
  @Input('from') from;
  @Input('to') to;
  hideChatpanel = false;

  public index: number;

  //In order to be abble to be closed, a subject
  close = new Subject<boolean>();

  constructor() { }

  ngOnInit() {}


  destroy() {
    this.close.next();
  }


}
