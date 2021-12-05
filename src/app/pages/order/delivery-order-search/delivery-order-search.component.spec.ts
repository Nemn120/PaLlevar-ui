import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderSearchComponent } from './delivery-order-search.component';

describe('DeliveryOrderSearchComponent', () => {
  let component: DeliveryOrderSearchComponent;
  let fixture: ComponentFixture<DeliveryOrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
