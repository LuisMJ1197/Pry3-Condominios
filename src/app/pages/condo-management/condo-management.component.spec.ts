import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoManagementComponent } from './condo-management.component';

describe('CondoManagementComponent', () => {
  let component: CondoManagementComponent;
  let fixture: ComponentFixture<CondoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
