import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalListComponent } from './sucursal-list.component';

describe('SucursalListComponent', () => {
  let component: SucursalListComponent;
  let fixture: ComponentFixture<SucursalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
