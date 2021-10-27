import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {BehaviorSubject, Subject} from 'rxjs';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";

export interface UserInfo {
  userName: string | null | undefined,
  imgUrl: string | null | undefined,
  userLog: object;
}

@Injectable({providedIn: 'root'})

export class AuthService {

  userLogin!: object | null | undefined;
  userInfo$ = new BehaviorSubject<UserInfo | null>(JSON.parse(localStorage.getItem('userinfo')))

  constructor(public router: Router, public googleAuth: AngularFireAuth) {
    this.googleAuth.user.subscribe(user => {
      this.userInfo$.next(JSON.parse(localStorage.getItem('userinfo')) || {
        userName: user?.displayName,
        imgUrl: user?.photoURL,
        userLog: user.toJSON()
      }
      );
    })
    this.userInfo$.subscribe((user) => this.userLogin = user.userLog)
  }

  googleLogin() {
    this.googleAuth.authState.subscribe(value => console.log(value))
    const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();// google enter
    if (!this.userLogin) {
      firebase.auth().signInWithPopup(GoogleAuthProvider).then(res => {
        if (res.user) {
          localStorage.setItem('userinfo', JSON.stringify({
            userName: res.user.displayName,
            imgUrl: res.user.photoURL,
            userLog: res.user.toJSON()
          }))
          this.userInfo$.next({
            userName: res.user.displayName,
            imgUrl: res.user.photoURL,
            userLog: res.user.toJSON()
          })
        }
      }).catch((e: string) => {
        console.log(e)
      })
    } else {
      this.router.navigate([''])
      this.userInfo$.next({
        userName: null,
        imgUrl: null,
        userLog: null
      })
      localStorage.removeItem('userinfo')
      firebase.auth().signOut();
    }

  }
}
