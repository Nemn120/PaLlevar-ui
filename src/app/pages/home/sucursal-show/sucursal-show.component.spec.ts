import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalShowComponent } from './sucursal-show.component';

describe('SucursalShowComponent', () => {
  let component: SucursalShowComponent;
  let fixture: ComponentFixture<SucursalShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
