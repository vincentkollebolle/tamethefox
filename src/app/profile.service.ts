import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './user';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: AngularFirestore) {}

  getEntries(to) {
    console.log(to);
    return this.firestore.collection<any>('profile',ref => ref.where('to', '==', to.email)).valueChanges();
  }

  addEntry(){
    //createdAt
    let entry2add = {
      from: "userFrom",
      fromTimestamp: new Date(),
      to: "userTo",
      content: "contenu de test",
      createdAt: new Date()
    }
    return this.firestore.collection('profile').add(entry2add);
  }


}
