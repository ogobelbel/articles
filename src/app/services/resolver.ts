import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<firebase.Unsubscribe> {
  constructor() {}

  resolve(): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged((user)=>{
      return user;
    })
  }
}
