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
  //https://medium.com/google-developer-experts/performing-or-queries-in-firebase-cloud-firestore-for-javascript-with-rxjs-c361671b201e
  // .orderBy("timestamp", Query.Direction.DESCENDING)
  //collection("posts").where("blogId", ">", "0").where("blogId", "<", "3").orderBy("timestamp", Query.Direction.DESCENDING).limit(50)
  /*
  orQuery(){

  }
  getOr(){ this.orQuery().subscribe(data => console.log(data))}

  //other option
  collection("posts").whereIn("blogId", Arrays.asList("1", "2"))
    .orderBy("timestamp", Query.Direction.DESCENDING).limit(50);
  */
  // les messages de userconnected à user
  // les messages de user à userconnected
  getEntries(from, to) {
    const $fromto1 = this.firestore.collection<any>("chat", ref => ref.where("from","==",from.email)).valueChanges();
    const $tofrom1 = this.firestore.collection<any>("chat", ref => ref.where("to","==",to.email)).valueChanges();

    const $fromto2 = this.firestore.collection<any>("chat", ref => ref.where("from","==",to.email)).valueChanges();
    const $tofrom2 = this.firestore.collection<any>("chat", ref => ref.where("to","==",from.email)).valueChanges();

    const first = combineLatest($fromto1,$tofrom1).pipe(
        map(([one, two]) => [...one, ...two])
    );

    const second = combineLatest($fromto2, $tofrom2).pipe(
        map(([one, two]) => [...one, ...two])
    );
    return combineLatest(first,second).pipe(
        map(([one, two]) => [...one, ...two])
    ).pipe(
      distinctUntilChanged(),
    );

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
