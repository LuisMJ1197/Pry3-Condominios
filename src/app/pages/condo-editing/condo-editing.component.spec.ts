import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoEditingComponent } from './condo-editing.component';

describe('CondoEditingComponent', () => {
  let component: CondoEditingComponent;
  let fixture: ComponentFixture<CondoEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondoEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondoEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
