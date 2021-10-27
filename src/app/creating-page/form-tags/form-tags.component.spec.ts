import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormTagsComponent } from './form-tags.component';

class MockAuthService{
  public tags = [];


}

const initialState = { theme: 'night' };
describe('FormTagsComponent', () => {
  let store: MockStore;
  let component: FormTagsComponent;
  let fixture: ComponentFixture<FormTagsComponent>;
  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ FormTagsComponent ],
      providers: [provideMockStore({initialState})]
    }).compileComponents()
    fixture = TestBed.createComponent(FormTagsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should add call add function after click', () => {
    fixture.detectChanges();
    spyOn(component, 'collectTag');
    let tag = fixture.debugElement.query(By.css('.article_tags'));
    tag.nativeElement.click();
    fixture.detectChanges();
    expect(component.collectTag).toHaveBeenCalled();
  });

 
});
