import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipFavoriteComponent } from './scholarship-favorite.component';

describe('ScholarshipFavoriteComponent', () => {
  let component: ScholarshipFavoriteComponent;
  let fixture: ComponentFixture<ScholarshipFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScholarshipFavoriteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
