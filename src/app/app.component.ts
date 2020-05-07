import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private fireauth: AngularFireAuth,
    private routeur: Router
    ) {

  }
  ngOnInit() {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.routeur.navigate(['/chat']);
      } else {
        this.routeur.navigate(['/signin']);
      }
    });
  }
}
