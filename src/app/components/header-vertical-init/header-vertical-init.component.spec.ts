import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVerticalInitComponent } from './header-vertical-init.component';

describe('HeaderVerticalInitComponent', () => {
  let component: HeaderVerticalInitComponent;
  let fixture: ComponentFixture<HeaderVerticalInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderVerticalInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderVerticalInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
