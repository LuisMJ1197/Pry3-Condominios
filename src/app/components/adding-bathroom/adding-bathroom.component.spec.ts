import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBathroomComponent } from './adding-bathroom.component';

describe('AddingBathroomComponent', () => {
  let component: AddingBathroomComponent;
  let fixture: ComponentFixture<AddingBathroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingBathroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingBathroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
