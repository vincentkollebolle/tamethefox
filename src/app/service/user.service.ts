import { Injectable } from '@angular/core';
//firebase / firestore
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
//RxJS
import { Observable} from "rxjs";
import { map, filter, mergeMap, count, take } from "rxjs/operators";
//model
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  
  connectedUser; 
 
  
  constructor(private firestore: AngularFirestore) { }  
  
  setConnectedUser(email) {
    console.log("before");
    
    const collection = this.firestore.collection<User>('users', ref => ref.where('email', '==', email))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          const currentUser = users[0];
          return currentUser;
        })
      ).subscribe(user => { 
        this.connectedUser = user; 
      });
    
    
  }

  getConnectedUser() {
    return this.connectedUser;
  }
  
  logConnectedUser() {
    console.log(this.connectedUser);
  }
  
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users')
      .valueChanges({ idField: 'id' })
  }
}