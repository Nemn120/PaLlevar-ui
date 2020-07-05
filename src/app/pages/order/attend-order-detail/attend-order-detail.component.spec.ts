import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendOrderDetailComponent } from './attend-order-detail.component';

describe('AttendOrderDetailComponent', () => {
  let component: AttendOrderDetailComponent;
  let fixture: ComponentFixture<AttendOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
