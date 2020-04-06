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

  /* OLD VERSION
  getEntries(from, to) {
    //FROM == VINCENT
    //TO == ANNA

    //tout les messages De vincent vers n'importe qui
    const $fromto1 = this.firestore.collection<any>("chat", ref => ref.where("from","==",from.email).orderBy("createdAt")).valueChanges();
    // tout les messages vers ANNA depuis n'importe qui
    const $tofrom1 = this.firestore.collection<any>("chat", ref => ref.where("to","==",to.email).orderBy("createdAt")).valueChanges();
    // tous les messages de anna vers qui que ce soit
    const $fromto2 = this.firestore.collection<any>("chat", ref => ref.where("from","==",to.email).orderBy("createdAt")).valueChanges();
    // tous les messages vers vincent depuis n'importe qui
    const $tofrom2 = this.firestore.collection<any>("chat", ref => ref.where("to","==",from.email).orderBy("createdAt")).valueChanges();

    //tout les messages De vincent vers n'importe qui
    // + // tout les messages vers ANNA depuis n'importe qui
    const first = combineLatest($fromto1,$tofrom1).pipe(
        map(([one, two]) => [...one, ...two])
    );

    //// tous les messages de anna vers qui que ce soit
    // + // tous les messages vers vincent depuis n'importe qui
    const second = combineLatest($fromto2, $tofrom2).pipe(
        map(([one, two]) => [...one, ...two])
    );
    return combineLatest(first,second).pipe(
        map(([one, two]) => [...one, ...two])
    ).pipe(
      distinctUntilChanged(),
    );

  }*/

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
