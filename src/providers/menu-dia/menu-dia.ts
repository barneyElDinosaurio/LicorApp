import { Injectable } from '@angular/core';
import { Reference, ThenableReference } from '@firebase/database-types';
import firebase from 'firebase';
/*
  Generated class for the MenuDiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuDiaProvider {

  public platosListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.platosListRef = firebase
          .database()
          .ref(`/platosDelDia`);
      }
    });
  }
  getPlatosList(): Reference {
    return this.platosListRef;
  }

  getPlatoDetail(eventId: string): Reference {
    return this.platosListRef.child(eventId);
  }

}
