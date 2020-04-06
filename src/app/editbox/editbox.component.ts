import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-editbox',
  templateUrl: './editbox.component.html',
  styleUrls: ['./editbox.component.scss']
})
export class EditboxComponent implements OnInit {

  @Input() user;

  constructor(private profileSrv: ProfileService) { }

  ngOnInit() {
  }

  addEntryToProfile() {
    this.profileSrv.addEntry();
  }

}
