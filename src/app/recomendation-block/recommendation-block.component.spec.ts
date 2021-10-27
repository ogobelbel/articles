import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationBlockComponent } from './recommendation-block.component';

describe('RecomendationBlockComponent', () => {
  let component: RecommendationBlockComponent;
  let fixture: ComponentFixture<RecommendationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
