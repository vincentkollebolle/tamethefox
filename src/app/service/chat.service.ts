import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore) {}

  getEntries() {
    return this.firestore.collection<any>("chat", ref => ref.orderBy('createdAt')).valueChanges();
  }

  addEntry(from, to, msgcontent){
    //createdAt
    let entry2add = {
      from: from.uid,
      to: to.uid,
      content: msgcontent,
      createdAt: new Date()
    }
    return this.firestore.collection('chat').add(entry2add);
  }
}
