import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  imagen = '../../../../assets/images/plato1.png';

  pedidos: any[] = [
    {nombre: 'Producto 1', precio: '30.00', categoria: 'combo'},
    {nombre: 'Producto 2', precio: '18.00', categoria: 'oferta'},
    {nombre: 'Producto 3', precio: '25.00', categoria: 'platillo'},
    {nombre: 'Producto 4', precio: '120.00', categoria: 'combo'},
  ];

  constructor() { }

  ngOnInit(): void {
  }
  openDialog() {}

  totalPrecio(): number {
    let total = 0;

    for(let pedido of this.pedidos) {
      total += pedido.precio;
    }
    return total;
  }
}
