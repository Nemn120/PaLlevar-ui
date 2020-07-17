import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoComponent } from './detalle-pedido.component';

describe('DetallePedidoComponent', () => {
  let component: DetallePedidoComponent;
  let fixture: ComponentFixture<DetallePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
