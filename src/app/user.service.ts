import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from "rxjs";
import { map, filter, mergeMap, count, take } from "rxjs/operators";
import { User } from './user';
import 'firebase/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  firebaseUser;
  connectedUser;
  users;

  constructor(
    public fireauth: AngularFireAuth,
    private firestore: AngularFirestore) {}

  ngOnInit() {

  }

  setCurrentConnectedUser(email) {
    this.connectedUser = this.getUserByEmail(email);
  }

  getConnectedUser(): Observable<User>  {
    /*this.getUser('vincent@kollebolle.com').subscribe(
      data => { this.connectedUser = data[0]; }
    );
    return this.connectedUser;*/
    return this.connectedUser;
  }

  getUserByEmail(email: string): Observable<User> {
    const collection = this.firestore.collection<User>('users', ref => ref.where('email', '==', email))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          const user = users[0];
          //console.log(user);
          return user;
        })
      );
    return user$;
  }

  /*
  // Query the users by a specific email and return the first User with ID added
return this.firestore.collection<User>('users', ref => ref.where('email',
'==', email))
  .snapshotChanges()
  .pipe(map(users => {
    const user = users[0];
    if (user) {
      const data = user.payload.doc.data() as User;
      const id = user.payload.doc.id;
      return { id, ...data };
    }
    else {
      return null;
    }
  }));
  */

  getUser(email): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => {
          return users.filter(user => user.email === email);
        }
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users')
      .valueChanges({ idField: 'id' })
  }










}
