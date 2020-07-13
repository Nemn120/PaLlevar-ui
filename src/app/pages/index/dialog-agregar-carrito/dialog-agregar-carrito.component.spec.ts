import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarCarritoComponent } from './dialog-agregar-carrito.component';

describe('DialogAgregarCarritoComponent', () => {
  let component: DialogAgregarCarritoComponent;
  let fixture: ComponentFixture<DialogAgregarCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAgregarCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
