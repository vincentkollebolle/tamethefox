import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-viewmyprofile',
  templateUrl: './viewmyprofile.component.html',
  styleUrls: ['./viewmyprofile.component.scss']
})
export class ViewmyprofileComponent implements OnInit {

  @Input() active;

  constructor() { }

  ngOnInit() {
  }

}
