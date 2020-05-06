import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: AngularFirestore) {}

  getEntries(to) {
    console.log(to);
    return this.firestore.collection<any>('profile',ref => ref.orderBy('createdAt').where('to', '==', to.uid)).valueChanges();
  }

  addEntry(from, to, msgcontent){
    //createdAt
    let entry2add = {
      from: from.uid,
      to: to.uid,
      content: msgcontent,
      createdAt: new Date()
    }
    return this.firestore.collection('profile').add(entry2add);
  }


}
