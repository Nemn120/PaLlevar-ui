import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeliverysComponent } from './user-deliverys.component';

describe('UserDeliverysComponent', () => {
  let component: UserDeliverysComponent;
  let fixture: ComponentFixture<UserDeliverysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeliverysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeliverysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
