/* GREAT THANKS TO : https://fireship.io/lessons/angularfire-google-oauth/ */
import { Injectable, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class FireauthService  implements OnInit  {

  user$: Observable<User>; //When logged-out, will have an Observable of null
;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { 
      
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.fireauth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
  
  }

  ngOnInit() {}

  async signIn(email,password) {
    //const provider = new auth.GoogleAuthProvider();
    //const credential = await this.fireauth.auth.signInWithPopup(provider);
    const credential = await this.fireauth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {return this.updateUserData(credential.user);})
      .catch(error => { console.log(error)});
    
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
    } 
    userRef.set(data, { merge: true });
    this.router.navigate(['/chat']);
    return userRef;

  }

  async signOut() {
    await this.fireauth.auth.signOut();
    this.router.navigate(['/']);
  }

  /*  */
}