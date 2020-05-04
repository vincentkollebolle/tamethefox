import { Injectable } from '@angular/core';
//firebase / firestore
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
//RxJS
import { Observable} from "rxjs";
import { map, filter, mergeMap, count, take } from "rxjs/operators";
//model
import { User } from './../model/user';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  
  connectedUser; 
 
  
  constructor(
    private firestore: AngularFirestore,
    private alertSrv: AlertService) { }  
  
 
  
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users')
      .valueChanges({ idField: 'id' })
  }

  changeMood(_uid, _mood: string) {
    this.firestore.doc(`users/${_uid}`).update({mood: _mood});
    this.alertSrv.warn('Vous avez changez votre humeur pour '+_mood, { autoClose: true ,keepAfterRouteChange: false});
    console.log(_uid);
  }
}