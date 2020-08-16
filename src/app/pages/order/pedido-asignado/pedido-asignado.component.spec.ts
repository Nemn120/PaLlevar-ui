import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAsignadoComponent } from './pedido-asignado.component';

describe('PedidoAsignadoComponent', () => {
  let component: PedidoAsignadoComponent;
  let fixture: ComponentFixture<PedidoAsignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoAsignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
