import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FooterComponent } from './footer.component';
const initialState = { theme: 'night' };
describe('FooterComponent', () => {
  let store: MockStore;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let footerCss: any;
  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [provideMockStore({initialState})]
    }).compileComponents()
    fixture = TestBed.createComponent(FooterComponent);

    footerCss = fixture.debugElement.query(By.css("footer")).nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState({ theme: 'night' });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('footer should have gray background with day theme', () => {
    expect(component.theme).toBe('day')
    expect(getComputedStyle(footerCss).backgroundColor).toEqual('rgb(51, 51, 51)');
  })

  it('footer should have black background with night theme', () => {
    component.theme = 'night';
    fixture.detectChanges();
    expect(getComputedStyle(footerCss).backgroundColor).toEqual('rgb(0, 0, 0)');
  });

});
