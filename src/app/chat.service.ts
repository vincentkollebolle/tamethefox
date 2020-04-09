import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from './user';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: AngularFirestore) {}

  getEntries(from, to) {
    //get all message (this will be filtered by the one witch call this function
    //[TODO]
    return this.firestore.collection<any>("chat", ref => ref.orderBy('createdAt')).valueChanges();
  }

  addEntry(from, to, msgcontent){
    //createdAt
    let entry2add = {
      from: from.email,
      fromTimestamp: new Date(),
      to: to.email,
      mood: from.mood,
      content: msgcontent,
      createdAt: new Date()
    }
    return this.firestore.collection('chat').add(entry2add);
  }
}
