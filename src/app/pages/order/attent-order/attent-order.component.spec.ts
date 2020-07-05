import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentOrderComponent } from './attent-order.component';

describe('AttentOrderComponent', () => {
  let component: AttentOrderComponent;
  let fixture: ComponentFixture<AttentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
