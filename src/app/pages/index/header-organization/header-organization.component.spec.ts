import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOrganizationComponent } from './header-organization.component';

describe('HeaderOrganizationComponent', () => {
  let component: HeaderOrganizationComponent;
  let fixture: ComponentFixture<HeaderOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
