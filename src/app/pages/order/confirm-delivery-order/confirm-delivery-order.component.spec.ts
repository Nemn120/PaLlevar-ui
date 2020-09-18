import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeliveryOrderComponent } from './confirm-delivery-order.component';

describe('ConfirmDeliveryOrderComponent', () => {
  let component: ConfirmDeliveryOrderComponent;
  let fixture: ComponentFixture<ConfirmDeliveryOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeliveryOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
