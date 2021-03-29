import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  firebaseUser;

  constructor(
    public fireauth: AngularFireAuth,
    private usrSrv: UserService,
    private router: Router) { }

  ngOnInit() {
    this.fireauth.auth.onAuthStateChanged((user) => { this.firebaseUser = user; });
  }

  signInUser(email: string, password: string) {

    //https://medium.com/@doyinolarewaju/firebase-adding-extra-information-to-user-on-sign-up-and-other-tips-4ebe215866e
    this.fireauth.auth.signInWithEmailAndPassword(email, password)
    .then(
      (user)=> {
        console.log(user);
        this.usrSrv.setCurrentConnectedUser(email);
        this.router.navigate(['/chat']);
      }
    )
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });


    /*  return new Promise(
        (resolve, reject) => {
          this.fireauth.auth.signInWithEmailAndPassword(email, password).then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    */
  }

  createNewUser(email: string, password: string) {
      return new Promise(
        (resolve, reject) => {
          this.fireauth.auth.createUserWithEmailAndPassword(email, password).then(
            () => {
              this.router.navigate(['/signin']);
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
  }

  signOutUser() {
      this.fireauth.auth.signOut();
  }
}
