import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ListarPedidoComponent } from './listar-pedido.component';

describe('ListarPedidoComponent', () => {
  let component: ListarPedidoComponent;
  let fixture: ComponentFixture<ListarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPedidoComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
