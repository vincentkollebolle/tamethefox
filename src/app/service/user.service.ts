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
  
  constructor(
    private firestore: AngularFirestore,
    private alertSrv: AlertService) { }  
  
 
  
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users')
      .valueChanges({ idField: 'id' })
  }

  changeMood(_uid, _mood: string) {
    console.log(_mood);
    this.firestore.doc(`users/${_uid}`).update({mood: _mood});
    if(_mood=="sunny") {
      this.alertSrv.warn('Vous voilà plein de soleil !', { autoClose: true ,keepAfterRouteChange: false});
    } else if(_mood=="clouds") {
      this.alertSrv.warn('Vous voilà nuageux !', { autoClose: true ,keepAfterRouteChange: false});
    } else if(_mood=="questions") {
      this.alertSrv.warn('Vous voilà plein de questions!', { autoClose: true ,keepAfterRouteChange: false});
    }
    
  }
}