import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeliveryFormComponent } from './user-delivery-form.component';

describe('UserDeliveryFormComponent', () => {
  let component: UserDeliveryFormComponent;
  let fixture: ComponentFixture<UserDeliveryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeliveryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeliveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
