import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './authentication.service';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('AuthService', () => {

  firebase.initializeApp(environment.firebaseConfig)
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [{ provide: Router, useValue: router },]
    });
    service = TestBed.inject(AuthService);
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should clear localstorage if user loggined out', () => {
    service.userLogin = 'true'; // if user already loggined in => localstorage should clear
    localStorage.setItem('userLog', 'true') //imitating loggined parametres

    service.googleLogin()   // function run after user click log out
    expect(window.localStorage.getItem('userLog')).toEqual(null)
  });

  it('should add info to localstorage if user login successfully', () => {
    service.userLogin = 'false'; // if user already loggined in => localstorage should clear

      service.googleLogin()   // function run after user click log in
      localStorage.setItem('userLog', 'true')     //imitating loggined parametres
    expect(window.localStorage.getItem('userLog')).toEqual('true')
  });


});
