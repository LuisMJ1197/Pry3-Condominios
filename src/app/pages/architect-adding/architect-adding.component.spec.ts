import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectAddingComponent } from './architect-adding.component';

describe('ArchitectAddingComponent', () => {
  let component: ArchitectAddingComponent;
  let fixture: ComponentFixture<ArchitectAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
