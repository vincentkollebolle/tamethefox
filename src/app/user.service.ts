// https://www.techiediaries.com/angular-firebase/angular-9-8-firestore-database-crud-tutorial/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";
import { User } from './user';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUser;//: User;

  constructor(
    private router: Router,
    private firestore: AngularFirestore) {}

  /*
  * Connect the user by updating the mood and timestamp
  * or create an account
  */
  connectOrCreateUser(email, mood) {
      //check if email exist in db
      //if yes define connectedUser.

      /*
       {
        timestamp: new Date(),
        mood: mood,
        email: email,
      };
      */

      const snapshotResult = this.firestore.collection('users', ref =>
       ref.where('email', '==', email)
          .limit(1))
          .snapshotChanges()
          .pipe(mergeMap(users => users));

       snapshotResult.subscribe(doc => {
           this.connectedUser = <User>doc.payload.doc.data();
       });

       //redirect to chat if ok
       if(this.connectedUser) {
         this.router.navigate(['/chat']);
       }
  }

  getConnectedUser(): User {
    return this.connectedUser;
  }

  getUsers() {
    //return this.firestore.collection('users').snapshotChanges();
    return this.firestore.collection<User>('users').valueChanges();
    //return this.firestore.collection("coffeeOrders").snapshotChanges();
  }

  createPolicy(user: User){
    return this.firestore.collection('users').add(user);
  }

  updatePolicy(user: User){
    //delete user.id;
    //this.firestore.doc('users/' + user.id).update(user);
  }

  deletePolicy(userId: string){
    //this.firestore.doc('users/' + userId).delete();
  }


}
