import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverymanDetailComponent } from './deliveryman-detail.component';

describe('DeliverymanDetailComponent', () => {
  let component: DeliverymanDetailComponent;
  let fixture: ComponentFixture<DeliverymanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverymanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverymanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
