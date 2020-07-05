import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalCardComponent } from './sucursal-card.component';

describe('SucursalCardComponent', () => {
  let component: SucursalCardComponent;
  let fixture: ComponentFixture<SucursalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
