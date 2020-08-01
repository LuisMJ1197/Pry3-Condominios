import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDesignComponent } from './init-design.component';

describe('InitDesignComponent', () => {
  let component: InitDesignComponent;
  let fixture: ComponentFixture<InitDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
