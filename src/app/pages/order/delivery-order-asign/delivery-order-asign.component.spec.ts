import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderAsignComponent } from './delivery-order-asign.component';

describe('DeliveryOrderAsignComponent', () => {
  let component: DeliveryOrderAsignComponent;
  let fixture: ComponentFixture<DeliveryOrderAsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderAsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderAsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
