import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBedroomComponent } from './adding-bedroom.component';

describe('AddingBedroomComponent', () => {
  let component: AddingBedroomComponent;
  let fixture: ComponentFixture<AddingBedroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingBedroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingBedroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
