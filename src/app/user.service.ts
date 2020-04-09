// https://www.techiediaries.com/angular-firebase/angular-9-8-firestore-database-crud-tutorial/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from "rxjs";
import { map, filter, mergeMap, count } from "rxjs/operators";
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

      const snapshotResult = this.firestore.collection('users', ref =>
       ref.where('email', '==', email)
          .limit(1))
          .snapshotChanges()
          .pipe(mergeMap(users => users));

       snapshotResult.subscribe(doc => {
           this.connectedUser = <User>doc.payload.doc.data();
       });

       /*snapshotResult.subscribe(doc => {
          this.connectedUser = <User>doc.map(e => {
           return {
             id: e.id;
             timestamp: e.timestamp.toDate(),
             mood: e.mood,
             email: e.email
           } as User;
         })
       }); */

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
    return this.firestore.collection<User>('users').valueChanges({ idField: 'id' });
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
