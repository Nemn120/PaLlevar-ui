import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrderComponent } from './send-order.component';

describe('SendOrderComponent', () => {
  let component: SendOrderComponent;
  let fixture: ComponentFixture<SendOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
