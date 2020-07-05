import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHomeComponent } from './nav-home.component';

describe('NavHomeComponent', () => {
  let component: NavHomeComponent;
  let fixture: ComponentFixture<NavHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
