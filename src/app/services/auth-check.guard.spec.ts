import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AuthCheckGuard } from './auth-check.guard';
import { RouterTestingModule } from '@angular/router/testing';
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('AuthCheckGuard', () => {


  let service: AuthCheckGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
],
      providers: [{ provide: Router, useValue: router },
      ]
    });
    service = TestBed.inject(AuthCheckGuard);
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should block route if user not loginned', () => {
    service.userLogin = '';
    const result = service.canLoad();
    expect(result).toBe(false);
  });

  it('should allow route if user loginned', () => {
    service.userLogin = 'true';
    const result = service.canLoad();
    expect(result).toBe(true);
  });

});
