import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CreatingPageComponent } from 'src/app/creating-page/creating-page.component';
import { ThemeChanger } from 'src/app/services/theme-changer.service';
import { HeaderComponent } from './header.component';


const initialState = { theme: 'night' };

let router = {
  navigate: jasmine.createSpy('navigate')
}
describe('HeaderComponent', () => {
  let headerInput: any;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [   RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({initialState}),
        ThemeChanger],
    }).compileComponents()
    fixture = TestBed.createComponent(HeaderComponent);
    headerInput = fixture.debugElement.query(By.css("#slider")).nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.userInfo  = {
      userName: 'Alex',
      imgUrl: 'asdfasdf',
      userLog: 'true'
    }

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('header default theme value should be day', () => {
    expect(component.theme).toBe('day')
  })

  it('theme slider should be checked if theme equal night', () => {
    component.theme = 'night';
    fixture.detectChanges();
    expect(headerInput.checked).toBe(true)
  });

  it('should change logIn button text, when user loggined', () => {

    fixture.detectChanges();
    const createButton = fixture.nativeElement.querySelector('.auth');
    expect(createButton.textContent).toBe('Log out')
  });

  it('should change style of header after theme is changed', () => {
    component.theme = 'night';
    fixture.detectChanges();
    let header = fixture.debugElement.query(By.css('header'));
    expect((header.nativeElement).classList.contains('dark_theme')).toBe(true)
  });

  it('should change text on the button',() => {
    fixture.detectChanges();
    let logButton = fixture.debugElement.query(By.css('.auth'));
    expect(logButton.nativeElement.textContent).toBe('Log out');

    component.userInfo  = { // user log out
      userName: '',
      imgUrl: '',
      userLog: ''
    }

    fixture.detectChanges();
    logButton = fixture.debugElement.query(By.css('.auth'));
    expect(logButton.nativeElement.textContent).toBe('Log in');
  });

  it('should create user photo, if user loggined', () => {
    fixture.detectChanges();
    let avatar = fixture.debugElement.query(By.css('.menu__item_avatar'))
    expect(avatar).toBeTruthy()
  });

  it('should create user name, if user loggined', () => {
    fixture.detectChanges();
    let userName = fixture.debugElement.query(By.css('.avatar_user_name'))
    expect(userName).toBeTruthy()
  });

  it('shold show button for create post, if user loggined', () => {
    fixture.detectChanges();
    const createButton = fixture.nativeElement.querySelector('.menu__item_post');
    expect(createButton).toBeTruthy()
  });

  it('shold call function theme on slider', () => {
    spyOn(component, 'toggleTheme');
    let logButton = fixture.debugElement.query(By.css('#slider'));
    logButton.nativeElement.click()
    fixture.detectChanges();
    expect(component.toggleTheme).toHaveBeenCalled();
  });

  it('shold call login function on log button', () => {
       fixture.detectChanges();
    spyOn(component, 'googleLogin');
    let logButton = fixture.debugElement.query(By.css('.auth'));
    logButton.nativeElement.click()
    fixture.detectChanges();
    expect(component.googleLogin).toHaveBeenCalled();
  });

  it('url should be correct', () => {
    fixture.detectChanges();
   let href =  fixture.debugElement.query(By.css('.menu__item_post')).nativeElement.getAttribute('href')
     fixture.detectChanges();
    expect(href).toEqual('/creating')
  });
});
