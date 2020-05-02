import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  logos = [
    "assets/img/logo/01.jpg",
    "assets/img/logo/02.jpg",
    "assets/img/logo/03.jpg",
    "assets/img/logo/03.jpg",
    "assets/img/logo/04.jpg",
    "assets/img/logo/05.jpg",
    "assets/img/logo/06.jpg",
    "assets/img/logo/07.jpg",
    "assets/img/logo/08.jpg",
    "assets/img/logo/09.jpg",
    "assets/img/logo/10.jpg",
    "assets/img/logo/11.jpg",
    "assets/img/logo/12.jpg",
    "assets/img/logo/14.jpg",
    "assets/img/logo/15.jpg",
    "assets/img/logo/16.jpg",
    "assets/img/logo/17.jpg",
    "assets/img/logo/18.jpg",
    "assets/img/logo/19.jpg",
    "assets/img/logo/20.jpg",
    "assets/img/logo/21.jpg",
  ];
  acutalImg;

  constructor() { }

  ngOnInit() {
    this.acutalImg = this.getRandomLogo();
  }

  getRandomLogo() {
    return this.logos[Math.floor(Math.random() * this.logos.length)]
  }
}
