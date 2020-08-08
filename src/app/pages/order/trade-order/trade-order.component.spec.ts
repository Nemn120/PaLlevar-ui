import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeOrderComponent } from './trade-order.component';

describe('TradeOrderComponent', () => {
  let component: TradeOrderComponent;
  let fixture: ComponentFixture<TradeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
