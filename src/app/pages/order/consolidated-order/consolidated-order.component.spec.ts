import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedOrderComponent } from './consolidated-order.component';

describe('ConsolidatedOrderComponent', () => {
  let component: ConsolidatedOrderComponent;
  let fixture: ComponentFixture<ConsolidatedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
