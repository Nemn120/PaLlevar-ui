import { Component, OnInit } from '@angular/core';
import { ProductBean } from '../../../_model/ProductBean';
import { CategoryProductBean } from '../../../_model/CategoryProductBean';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  imagen = '../../../../assets/images/plato1.png';

  categoria1: CategoryProductBean = {id: 1, name: 'combo', description: 'descripcion 1', pathPhoto: '', _foto: null, _isFoto:null,
    createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1, };

  platillos: ProductBean[] = [
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null, _foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1}
  ];

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  agregarCarrito(item) {
    
  }
  verCarrito() {
    
  }
}



