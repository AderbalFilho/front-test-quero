import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchorlarshipFavoriteComponent } from './schorlarship-favorite.component';

describe('SchorlarshipFavoriteComponent', () => {
  let component: SchorlarshipFavoriteComponent;
  let fixture: ComponentFixture<SchorlarshipFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchorlarshipFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchorlarshipFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
