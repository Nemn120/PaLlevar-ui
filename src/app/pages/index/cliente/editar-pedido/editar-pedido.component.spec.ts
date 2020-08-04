import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPedidoComponent } from './editar-pedido.component';

describe('EditarPedidoComponent', () => {
  let component: EditarPedidoComponent;
  let fixture: ComponentFixture<EditarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
