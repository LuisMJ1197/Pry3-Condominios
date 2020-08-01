import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDesingComponent } from './house-desing.component';

describe('HouseDesingComponent', () => {
  let component: HouseDesingComponent;
  let fixture: ComponentFixture<HouseDesingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseDesingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
