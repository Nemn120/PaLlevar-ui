import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSidenavComponent } from './sidebar-sidenav.component';

describe('SidebarSidenavComponent', () => {
  let component: SidebarSidenavComponent;
  let fixture: ComponentFixture<SidebarSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
